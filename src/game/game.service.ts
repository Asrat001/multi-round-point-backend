import { Injectable } from '@nestjs/common';

interface Player {
  id: string;
  name: string;
  score: number;
}

@Injectable()
export class GameService {
  private readonly MIN_PLAYERS = 4;
  private readonly TOTAL_ROUNDS = 5;
  private players: Map<string, Player> = new Map();
  private currentRound = 0;
  private gameActive = false;

  addPlayer(id: string, name: string): string {
    this.players.set(id, { id, name, score: 0 });
    return id;
  }

  removePlayer(id: string): void {
    this.players.delete(id);
  }

  getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  shouldStartGame(): boolean {
    return this.players.size >= this.MIN_PLAYERS && !this.gameActive;
  }

  startGame(): void {
    this.gameActive = true;
    this.currentRound = 1;
  }

  isGameActive(): boolean {
    return this.gameActive;
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  getTotalRounds(): number {
    return this.TOTAL_ROUNDS;
  }

  endRound(): { winner: Player; players: Player[] } {
    const players = this.getPlayers();
    const winner = this.selectRandomWinner(players);
    
    // Update winner's score
    const winnerPlayer = this.players.get(winner.id);
    if (winnerPlayer) {
      winnerPlayer.score += 1;
      this.players.set(winner.id, winnerPlayer);
    }

    this.currentRound++;
    return { winner, players: this.getPlayers() };
  }

  isGameOver(): boolean {
    return this.currentRound > this.TOTAL_ROUNDS;
  }

  getGameResult(): { players: Player[]; winners: Player[] } {
    const players = this.getPlayers();
    const maxScore = Math.max(...players.map(p => p.score));
    const winners = players.filter(p => p.score === maxScore);
    
    this.gameActive = false;
    this.currentRound = 0;
    
    return { players, winners };
  }

  private selectRandomWinner(players: Player[]): Player {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
  }

  resetGame(): void {
    this.players.forEach(player => player.score = 0);
    this.currentRound = 0;
    this.gameActive = false;
  }
} 