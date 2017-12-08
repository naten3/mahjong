import * as SocksJs from 'socksjs'
import * as Jwt from 'jwt-express'
import * as GameOps from './game-operations'
import { BehaviorSubject } from 'rxjs';

import { User, PlayerCountChangeMessage, Deck, Tile, GameState, GameStateUpdate,
  GameStateType, ActiveGameState } from '../models'
import { UserService, WebsocketService, UserWebsocket } from './'

const PLAYERS_FOR_GAME: number = 4;
//todo config file
const tilesPerHand: number = 16;
const bonusTiles: boolean = true;


export class GameService {
  userService: UserService;
  websocketService: WebsocketService;

  gameStateSubject: BehaviorSubject<GameState> = new BehaviorSubject(null);

  constructor(userService: UserService, websocketService: WebsocketService) {
    this.userService = userService;
    this.websocketService = websocketService;

    websocketService.clientChangeObservable.subscribe( userMap => this.handlePlayerUpdate(userMap));
  }

  setGameState(gameState: GameState) {
    this.gameStateSubject.next(gameState);
  }

  handlePlayerUpdate(userMap: Map<number, UserWebsocket>) {
    let playerCountChangeMessage = new PlayerCountChangeMessage(userMap.size);
    console.log(`${userMap.size} players currently`)
    if (userMap.size == PLAYERS_FOR_GAME) {
      this.startGame(userMap);
    } else {
      for (let userWebSocket of userMap.values()) {
        userWebSocket.send(playerCountChangeMessage);
      }
    }
  }

  startGame(userMap: Map<number, UserWebsocket>) {
    let users = Array.from(userMap.keys())
      .map(id => this.userService.getUserFromId(id))
    let gameState = GameOps.newGameState(users, {bonusTiles, tilesPerHand});

    this.setGameState(gameState);

    this.gameStateSubject.subscribe(gameState => {
      userMap.forEach((userWebSocket, userId) => {
        let updateMessage = new GameStateUpdate(GameOps.gameStateToUser(gameState, userId))
        userWebSocket.send(updateMessage);
      });
    });
  }

  draw(userId: number) {
    if (this.gameStateSubject.value.type != GameStateType.ACTIVE) {
      throw Error("Can't draw, not an active game")
    }
    let gameState = GameOps.draw(this.gameStateSubject.value as ActiveGameState, userId, tilesPerHand)
    this.setGameState(gameState);
  }
 }
