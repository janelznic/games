import { Injectable } from '@nestjs/common';
import { Call } from './interfaces/call.interface';
import CallModel from './call.model';

@Injectable()
export class CallService {

  public getCalls = async (day: string): Promise<any> => {
    try {
      const calls: any = CallModel.findAll({
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
