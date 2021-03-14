import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDTO) {
    await this.playerService.upinsertPlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(@Query('email') email: string) {
    if (email) {
      return await this.playerService.getPlayerByEmail(email);
    } else {
      return await this.playerService.getAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string) {
    if (email) return await this.playerService.deletePlayer(email);
    else throw new BadRequestException('Missing email in query params');
  }
}
