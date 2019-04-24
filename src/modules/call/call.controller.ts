import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CallService } from './call.service';

@Controller('calls')
export class CallController {
  constructor(
    private readonly callService: CallService,
  ) { }

  @Get('/')
  @UseGuards(AuthGuard('bearer'))
  async getCallsOnMonday() {
    try {
      return await this.callService.getCalls({dayInWeek: 'Mon'});
    } catch (e) {
      throw Error(e);
    }
  }
}
