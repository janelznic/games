import { Module } from '@nestjs/common';
import { CallModule } from '../call/call.module';
import { CallService } from '../call/call.service';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [CallModule],
  providers: [GameService, CallService],
  controllers: [GameController],
})
export class GameModule {}
