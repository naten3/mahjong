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
  UserFacingPlayer,
  UserFacingMeld,
  UserKnownMeld,
  UserConcealedMeld,
  PlayerPosition } from '../models'

// Hand operations
function removeTile(hand: Hand, tileId: number): Hand {
  if (!hand.freeTiles.find(tile => tile.id == tileId)) {
    throw Error(`Tried to remove tile ${tileId} which is not present`)
  }
  return new Hand(hand.melds, hand.freeTiles.filter(tile => tile.id != tileId))
}

function addTile(hand: Hand, tile: Tile): Hand {
  let freeTiles = hand.freeTiles.slice();
  freeTiles.push(tile);
  return new Hand(hand.melds, freeTiles);
}

export function gameStateToUser(gameState: GameState, userId: number): UserFacingGameState {
  switch (gameState.type) {
    case GameStateType.WAITING:
      return new UserFacingWaitingGameState([PlayerPosition.NORTH]); //TODO
    case GameStateType.ACTIVE:
      let activeGameState = gameState as ActiveGameState
      let otherPlayers: Array<UserFacingPlayer> = activeGameState.players.filter(p => p.user.id !== userId)
      .map(p => playerToUserFacingPlayer(p));
      let userHand = activeGameState.players.filter(p => p.user.id == userId)[0].hand
      return new UserFacingActiveGameState(otherPlayers, userHand, activeGameState.currentTurn)
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
  return new ActiveGameState(players, deck, PlayerPosition.EAST)
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
