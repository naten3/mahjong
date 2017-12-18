import * as Jwt from 'jwt-express'
import * as GameOps from './game-operations'
import { BehaviorSubject } from 'rxjs';

import { User, PlayerCountChangeMessage, Deck, Tile, GameState, GameStateUpdate,
  GameStateType, ActiveGameState, UserFacingGameState, UserFacingGameStateType,
  NotStartedGameState } from '../models'
import { UserService, WebsocketService, UserWebsocket } from './'

const PLAYERS_FOR_GAME: number = 4;
//todo config file
const tilesPerHand: number = 16;
const bonusTiles: boolean = true;


export class GameService {
  userService: UserService;
  websocketService: WebsocketService;

  gameStateSubject: BehaviorSubject<GameState> = new BehaviorSubject(new NotStartedGameState());

  constructor(userService: UserService, websocketService: WebsocketService) {
    this.userService = userService;
    this.websocketService = websocketService;

    websocketService.clients$.subscribe( users => this.handlePlayerUpdate(users));
  }

  setGameState(gameState: GameState) {
    this.gameStateSubject.next(gameState);
  }

  handlePlayerUpdate(users: Array<UserWebsocket>) {
    let playerCountChangeMessage = new PlayerCountChangeMessage(users.length);
    console.log(`${users.length} players currently`)
    if (users.length == PLAYERS_FOR_GAME) {
      this.startGame(users);
    } else {
      for (let userWebSocket of users) {
        userWebSocket.send(playerCountChangeMessage);
      }
    }
  }

  startGame(userWebsockets: Array<UserWebsocket>) {
    let userIds = userWebsockets.map(uws => uws.userId)
    let users = userIds
      .map(id => this.userService.getUserFromId(id))
    let gameState = GameOps.newGameState(users, {bonusTiles, tilesPerHand});
    console.log("started new game")
    this.setGameState(gameState);

    this.gameStateSubject.subscribe(gameState => {
      userWebsockets.forEach((userWebsocket) => {
        let updateMessage = new GameStateUpdate(GameOps.gameStateToUser(gameState, userWebsocket.userId))
        userWebsocket.send(updateMessage);
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

  getState(userId: number): UserFacingGameState {
    return GameOps.gameStateToUser(this.gameStateSubject.value, userId)
  }
 }
