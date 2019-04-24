import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { CallModule } from './modules/call/call.module';

@Module({
  imports: [CallModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
