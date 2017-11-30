const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const rp = require('request-promise');
const spotifySecrets = require('./spotify-secrets');
const buckets = require('buckets-js');
const rxjs = require('rxjs');
const path = require('path');
const Observable = rxjs.Observable;

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const password = "slalomboombox";

const usernames = new Set();

const spotifyApi = new SpotifyWebApi({
  clientId : spotifySecrets.clientId,
  clientSecret : spotifySecrets.clientSecret,
  redirectUri : 'https://boombox-server.herokuapp.com/auth'
});
const scopes = ['user-modify-playback-state', 'user-read-playback-state'];

const queue = buckets.Queue();

let queueObserver;
let playReadyObserver;
let currentSong;

let code;

function reauth() {
  return rp('https://accounts.spotify.com/authorize/?client_id=d33a00c8be1f4f018104972316a4fcfe&response_type=code&redirect_uri=https%3A%2F%2Fboombox-server.herokuapp.com%2Fauth&scope=user-modify-playback-state&state=something')
    .catch(function (err) {
        console.log('Reauth failed: ' + JSON.stringify(err));
        code = undefined;
    });
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//todo very short time
queueObserver = Observable.interval(5000).flatMap(() => {
  if (queue.isEmpty()) {
    return Observable.empty();
  } else {
    console.log("Something was in the queue, dequeueing");
    let track = queue.dequeue();
    console.log("dequeued track: " + JSON.stringify(track));
    return Observable.of(track);
  }
})

let playReady= false;
let waitAfterPlaying = false;

Observable.interval(1000).flatMap(() => {
  return Observable.fromPromise(nowPlaying())
  .map(playerStatus => {
    if (playerStatus && !playerStatus.body.is_playing) {
      console.log("Nothing is playing, setting ready to play = true")
      console.log(playerStatus);
      playReady = true;
      return true;
    } else {
      console.log("Something is playing or poll failed");
      console.log(playerStatus);
      playReady = false;
      return false;
    }
  });
}).subscribe(playReady => {});

//todo very short time
queueObserver = Observable.interval(2000).flatMap(() => {
  if (queue.isEmpty()) {
    console.log("queue is empty")
    return Observable.empty();
  } else if (playReady == false){
    console.log("not ready to play, not playing");
    return Observable.empty();
  } else if (waitAfterPlaying == true) {
    console.log("played really recently so won't play");
    return Observable.empty();
  } else {
    console.log("Something was in the queue, playing");
    let track = queue.dequeue();
    play(track);
    waitAfterPlaying = true;
    setTimeout(() => waitAfterPlaying = false, 5000);
    console.log("dequeued track: " + JSON.stringify(track));
    return Observable.of(track).delay(5000);
  }
}).subscribe(() => {});

function nowPlaying() {
  //return Promise.resolve({is_playing: false});
  return spotifyApi.getMyCurrentPlaybackState().catch(reason => console.log("now playing failed for reasons: " + reason));
}

app.get('/auth', function(req, res) {
  if (req.query.code) {
    code = req.query.code;
    spotifyApi.authorizationCodeGrant(
      code
    ).then(function(data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      res.status(204).send();
    }, function(err) {
      console.log('Something went wrong!', err);
      code = undefined;
    });
  }
});

app.post('/session', function (req, res) {
  if (req.body.password === password) {
    if (!req.body.username) {
      res.statusCode = 400;
      res.send("Please supply a username")
    } else if (usernames.has(req.body.username)) {
      res.statusCode = 401;
      res.send("User is already logged in");
    } else {
      usernames.add(req.body.username)
      res.statusCode = 204;
      res.send();
    }
  } else {
    res.statusCode = 401;
    res.send("Invalid Password");
  }
});

app.delete('/session', function (req, res) {
  usernames.delete(req.body.username)
  res.statusCode = 200;
  res.send();
});

/**
 * GET /search?query=[searchString]&type=[artist OR album OR track]
 * Type is optional. If not specified, all three types will be returned.
 */
app.get('/search', function (req, res) {
  if (!req.params || !req.query.query) {
    res.status(400).send({ error: 'You didn\'t give me a search string! GET /search?query=searchString' });
  }
  const query = req.query.query;

  const reauthPromise = !code ? reauth() : Promise.resolve();

  reauthPromise.then(function() {
    return spotifyApi.searchTracks(query, { limit: 20 });
  }).then(function(data) {
    res.status(200).send({
      tracks: data.body.tracks.items
    });
  }).catch(function(err) {
      if (err) {
        console.log('Error occurred in search: ' + err);
        code = undefined;
        res.status(500).send({ error: 'Unexpected error occurred' });
      }
  });

});

/**
 * PUT /search?query=[searchString]&type=[artist OR album OR track]
 */
app.put('/queue', function (req, res) {
  if (!req.body || !req.body.track.uri) {
    res.status(400).send({ error: 'You didn\'t give me a uri to play! GET /search?query=searchString' });
  }
  queue.enqueue(req.body.track);
  res.statusCode = 202;
  res.send();
});

function play(track) {
  spotifyApi.play({ uris: [track.uri] }).then(function(data) {
    currentSong = track;
  }, function(err) {
    if (err) {
      console.log('Error occurred in search: ' + err);
      res.status(500).send({ error: 'Unexpected error occurred' });
    }
  });
}

/**
 * GET /queue
 */
app.get('/queue', function (req, res) {
  res.send(queue.toArray());
});

app.get('/currentSong', function (req, res) {
  if (!currentSong) {
    res.statusCode = 404;
    res.send("No song");
  } else {
    res.send(currentSong);
  }
});

app.listen(port, function () {
  console.log('app listening on port ' + port);
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});
app.use(express.static(path.resolve(__dirname, 'build')));
