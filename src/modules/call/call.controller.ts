import { Controller, Get } from '@nestjs/common';
import { CallService } from './call.service';

@Controller('calls')
export class CallController {

  constructor(
    private readonly callService: CallService,
  ) { }

  @Get('/')
  async getCallsOnMonday() {
    try {
      return await this.callService.getCalls({dayInWeek: 'Mon'});
    } catch (e) {
      throw Error(e);
    }
  }
}
