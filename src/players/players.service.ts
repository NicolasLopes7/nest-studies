import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async upinsertPlayer(createPlayerDto: CreatePlayerDTO) {
    const selectedPlayer = this.players.find(
      (player) => player.email === createPlayerDto.email,
    );
    if (selectedPlayer) {
      await this.update(selectedPlayer, createPlayerDto);
    } else await this.create(createPlayerDto);
  }

  async getAllPlayers() {
    this.logger.log(`Getting all players (Length: ${this.players.length})`);
    return this.players;
  }

  async deletePlayer(email: string) {
    this.logger.log(`deleting player with email: ${email}`);

    const selectedPlayer = this.players.find(
      (player) => player.email === email,
    );

    if (!selectedPlayer)
      throw new NotFoundException(`Player with email ${email} not found`);

    this.players = this.players.filter((player) => player !== selectedPlayer);
  }

  async getPlayerByEmail(email: string) {
    this.logger.log(`Getting player with email: ${email}`);

    const player = this.players.find((player) => player.email === email);

    if (!player) {
      this.logger.warn(`Player with e-mail ${email} not founded`);
      throw new NotFoundException(`Player with email ${email} not founded`);
    }

    return player;
  }

  private create(createPlayerDto: CreatePlayerDTO) {
    const player: Player = {
      _id: v4(),
      ...createPlayerDto,
      ranking: 'a',
      rankingPosition: 0,
      photoUrl: 'https://teste.com',
    };

    this.logger.log(`Creating player: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(player: Player, { name }: CreatePlayerDTO) {
    this.logger.log(`Updating name of player ${player._id}`);
    player.name = name;
  }
}
