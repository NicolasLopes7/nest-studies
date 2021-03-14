import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { UpdatePlayerDTO } from './dtos/updatePlayer.dto';
import { PlayerPipe } from './pipes/player.pipe';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDTO) {
    await this.playerService.createPlayer(createPlayerDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDTO,
  ) {
    await this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Get()
  async getPlayers() {
    return await this.playerService.getAllPlayers();
  }

  @Get('/:_id')
  async getPlayerById(@Param('_id') _id: string) {
    console.log(_id);
    return await this.playerService.getPlayerById(_id);
  }

  @Delete()
  async deletePlayer(@Query('email', PlayerPipe) email: string) {
    if (email) return await this.playerService.deletePlayer(email);
    else throw new BadRequestException('Missing email in query params');
  }
}
