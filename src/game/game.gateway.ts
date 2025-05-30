import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    const playerName = client.handshake.query.playerName as string || `Player ${client.id.slice(0, 4)}`;
    const playerId = this.gameService.addPlayer(client.id, playerName);
    this.broadcastPlayerUpdate();
    this.server.emit('player_joined', { name: playerName });
  }

  handleDisconnect(client: Socket) {
    const player = this.gameService.getPlayers().find(p => p.id === client.id);
    this.gameService.removePlayer(client.id);
    this.broadcastPlayerUpdate();
    if (player) {
      this.server.emit('player_left', { name: player.name });
    }
  }


  @SubscribeMessage('restart_game')
  handleRestartGame(client: Socket) {
    this.gameService.resetGame();
    // Only start if enough players
    if (this.gameService.shouldStartGame()) {
      this.gameService.startGame();
      this.server.emit('game_start', {
        totalRounds: this.gameService.getTotalRounds(),
      });
      this.startNewRound();
    } else {
      // Just broadcast player update and wait for more players
      this.broadcastPlayerUpdate();
    }
  }


  @SubscribeMessage('start_game')
  handleStartGame(client: Socket) {
    if (this.gameService.shouldStartGame()) {
      this.gameService.startGame();
      this.server.emit('game_start', {
        totalRounds: this.gameService.getTotalRounds(),
      });
      this.startNewRound();
      return { success: true };
    }
    return { success: false, message: 'Not enough players to start the game' };
  }

  private broadcastPlayerUpdate() {
    const players = this.gameService.getPlayers();
    this.server.emit('player_update', { players });
  }

  private startNewRound() {
    if (!this.gameService.isGameActive()) return;

    const currentRound = this.gameService.getCurrentRound();
    this.server.emit('new_round', {
      round: currentRound,
      totalRounds: this.gameService.getTotalRounds(),
    });

    // Simulate spinning period
    setTimeout(() => {
      const roundResult = this.gameService.endRound();
      this.server.emit('round_result', roundResult);

      if (this.gameService.isGameOver()) {
        const gameResult = this.gameService.getGameResult();
        this.server.emit('game_over', gameResult);
      } else {
        this.startNewRound();
      }
    }, 9000); // 3 seconds spinning period
  }
} 