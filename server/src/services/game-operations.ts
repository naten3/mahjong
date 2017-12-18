import * as _ from 'lodash';
import {
  User,
  Tile,
  Hand,
  Deck,
  NumberTile, NumberTileType,
  DragonTile, DragonTileType,
  WindTile, WindTileType,
  BonusTile, BonusTileType,
  GameStateType, GameState, ActiveGameState,
  Player,
  Meld,
  UserFacingGameState,
  UserFacingGameStateType,
  UserFacingWaitingGameState,
  UserFacingActiveGameState,
  UserNotStartedGameState,
  UserFacingPlayer,
  UserFacingMeld,
  UserKnownMeld,
  UserConcealedMeld,
  PlayerPosition } from '../models'

  let meldId = 0;
  let nextMeldId: () => number = function(): number {
    let result = meldId;
    meldId++;
    return result;
  }

export function makeMeld(gameState: ActiveGameState, ids: Array<number>, known: boolean, userId: number): ActiveGameState {
  if (ids.length > 4) {
    throw Error("Melds cannot be bigger than 4")
  }
  let player = matchingPlayer(gameState, userId);
  let hand: Hand = player.hand
  let partition = _.groupBy(hand.freeTiles, function(v) { return (ids.includes(v.id)) ? 'meldTiles' : 'freeTiles'; })
  if (partition.meldTiles.length < 3) {
    throw Error(`only ${partition.meldTiles.length} tiles matching `)
  }
  let newMeld = new Meld(nextMeldId(), known, partition.meldTiles);
  let newMelds = hand.melds.slice(0);
  newMelds.push(newMeld);
  let newHand = new Hand(newMelds, partition.freeTiles)
  return updatePlayer(gameState, player.withHand(newHand));
}

export function draw(gameState: ActiveGameState, userId: number, handSize: number): ActiveGameState {
  if (gameState.deck.isEmpty()) {
    throw Error("The deck is empty!")
  }
  let player = matchingPlayer(gameState, userId);
  if (player.hand.size() >= 1 + handSize) {
    throw Error('Too many tiles!');
  }
  if(gameState.currentTurn != player.position) {

    throw Error(`current turn ${gameState.currentTurn} doens't match player position ${player.position}`);
  }

  let newDeck = new Deck(gameState.deck.tiles.slice(1));
  let tile = gameState.deck.tiles[0];

  let freeTiles = player.hand.freeTiles.slice(0);
  freeTiles.push(tile);
  let newHand: Hand = new Hand(player.hand.melds, freeTiles);
  return updatePlayer(gameState, player.withHand(newHand));
}

function updatePlayer(gameState: ActiveGameState, player: Player ): ActiveGameState {
  //get the player to make sure they are in the game
  matchingPlayer(gameState, player.user.id);

  let players = gameState.players.map(p => p.user.id == player.user.id ? player : p);
  return new ActiveGameState(players, gameState.deck, gameState.currentTurn, gameState.discard);
}

function matchingPlayer(gameState: ActiveGameState, userId: number) {
  let matchingPlayers = gameState.players.filter(p => p.user.id == userId);
  if (matchingPlayers.length != 1) {
    throw Error(`found ${matchingPlayers.length} matches for userId ${userId}`)
  }
  console.log(`found player matching with id ${matchingPlayers[0].user.id}`)
  return matchingPlayers[0];
}

export function gameStateToUser(gameState: GameState, userId: number): UserFacingGameState {
  switch (gameState.type) {
    case GameStateType.WAITING:
      return new UserFacingWaitingGameState([PlayerPosition.N]); //TODO
    case GameStateType.NOT_STARTED:
      console.log("returning not started state")
      return new UserNotStartedGameState();
    case GameStateType.ACTIVE:
      let activeGameState = gameState as ActiveGameState
      let otherPlayers: Array<UserFacingPlayer> = activeGameState.players.filter(p => p.user.id !== userId)
      .map(p => playerToUserFacingPlayer(p));
      let userPlayer = activeGameState.players.filter(p => p.user.id == userId)[0];
      if(!userPlayer) {
        let message = `User with id ${userId} not in active game`;
        console.log(message)
        throw Error(message)}
      let userHand = userPlayer.hand;
      return new UserFacingActiveGameState(otherPlayers, userHand, activeGameState.currentTurn, userPlayer.position)
    default: throw Error("unrecognized game state type")
  }
}

function playerToUserFacingPlayer(player: Player): UserFacingPlayer {
  let melds = player.hand.melds.map(m => meldToUserFacingMeld(m))
  return new UserFacingPlayer(player.hand.freeTiles.length,
  melds,
  player.user.name,
  player.position)
}

function meldToUserFacingMeld(meld: Meld): UserFacingMeld {
  if (meld.known) {
    return new UserKnownMeld(meld.tiles)
  } else {
    return new UserConcealedMeld(meld.tiles.length)
  }
}

export function newGameState(users: Array<User>, options: GameOptions): ActiveGameState {
  // mutate tiles just until dealing just to avoid tons of copies
  let tiles = initializeDeck(options);

  let fetchPlayerHand: () => Hand = function() {
    console.log("fetching new hand") //TODO debug code
    let playerTiles = tiles.slice(0, options.tilesPerHand)
    tiles = tiles.slice(options.tilesPerHand);
    return new Hand([], playerTiles);
  }

  let positions = Object.keys(PlayerPosition);

  let players: Array<Player> = _.shuffle(users).map((user, index) =>
    new Player(user, fetchPlayerHand(), positions[index] as PlayerPosition));

  let deck = new Deck(tiles);

  //TODO REQUIREMENT
  //EAST shouldn't always start, and players should keep their directions
  // maybe make newRoundStart?
  return new ActiveGameState(players, deck, PlayerPosition.E, null)
}

export interface GameOptions {
  bonusTiles: boolean;
  tilesPerHand: number;
}

function initializeDeck(options: GameOptions): Array<Tile> {
  let id = 0;
  let nextId: () => number = function(): number {
    let result = id;
    id++;
    return result;
  }

  let tiles = [];

  //4 of each number tile
  for (let numberTileType  of Object.keys(NumberTileType)) {
    for ( let i = 1; i <= 9; i++) {
      let numberTile =new NumberTile(i, numberTileType as NumberTileType);
      for (let j = 0; j < 4; j++) {
        tiles.push(new Tile(nextId(), numberTile))
      }
    }
  }

  for (let dragonTileType  of Object.keys(DragonTileType)) {
    let dragonTileIdentifier = new DragonTile(dragonTileType as DragonTileType);
    for (let j = 0; j < 4; j++) {
      tiles.push(new Tile(nextId(), dragonTileIdentifier))
    }
  }

  for (let windTileType  of Object.keys(WindTileType)) {
    let dragonTileIdentifier = new WindTile(windTileType as WindTileType);
    for (let j = 0; j < 4; j++) {
      tiles.push(new Tile(nextId(), dragonTileIdentifier))
    }
  }

  if (options.bonusTiles) {
    for (let bonusTileType  of Object.keys(BonusTileType)) {
      for (let j = 1; j <= 4; j++) {
        tiles.push(new Tile(nextId(), new BonusTile(j, bonusTileType as BonusTileType)))
      }
    }
  }

  return _.shuffle(tiles);
}
