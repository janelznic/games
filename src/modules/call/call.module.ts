import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CallService } from './call.service';
import { CallController } from './call.controller';

@Module({
  imports: [AuthModule, PassportModule],
  providers: [CallService],
  controllers: [CallController],
})
export class CallModule {}
