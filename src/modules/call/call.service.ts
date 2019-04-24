import { Injectable } from '@nestjs/common';
import { Call } from './interfaces/call.interface';
import CallModel from './call.model';

@Injectable()
export class CallService {

  public log = async (): Promise<Call> => {
    try {
      const record: Call = CallModel.create().then(log => {
        return log;
      });
      return record;
    } catch (error) {
      throw new Error('Error reading calls from database');
    }
  }

  public getCalls = async (day: string): Promise<any> => {
    try {
      const calls: Call[] = CallModel.findAll({
        order: [['id', 'ASC']],
      }).then(call => {
        return call;
      });
      return calls;
    } catch (error) {
      throw new Error('Error reading calls from database');
    }
  }
}
