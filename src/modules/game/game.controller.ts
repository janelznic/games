import { Controller, Get } from '@nestjs/common';
import { CallService } from '../call/call.service';
import { GameService } from './game.service';

@Controller('games')
export class GameController {

  constructor(
    private readonly callService: CallService,
    private readonly gameService: GameService,
  ) {}

  @Get('/')
  async getGameInfo() {
    try {
      this.callService.log();
      return await this.gameService.getGames('grand theft auto', { storeID: 1, desc: 0, pageSize: 20 });
    } catch (e) {
      throw Error(e);
    }
  }
}
