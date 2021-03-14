import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dtos/updatePlayer.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async getAllPlayers() {
    return await this.playerModel.find();
  }

  async deletePlayer(email: string) {
    return await this.playerModel.findOneAndDelete({ email });
  }

  async getPlayerById(_id: string) {
    return await this.playerModel.findById({ _id });
  }

  async createPlayer(createPlayerDto: CreatePlayerDTO) {
    const player = new this.playerModel(createPlayerDto);
    return await player.save();
  }

  async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDTO) {
    return await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDto })
      .exec();
  }
}
