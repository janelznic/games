import { Injectable } from '@nestjs/common';
import { Call, GetCallsOptions } from './interfaces/call.interface';
import CallModel from './call.model';
import { Sequelize } from 'sequelize';
import * as daysOfWeek from './call.consts';

@Injectable()
export class CallService {

  public log = async (): Promise<Call> => {
    try {
      const record: Call = CallModel.create().then(log => log);
      return record;
    } catch (error) {
      throw new Error('Error reading calls from database');
    }
  }

  public getCalls = async (opt?: GetCallsOptions): Promise<any> => {
    try {
      const calls: Call[] = CallModel.findAll({
        where: opt && opt.dayInWeek ? Sequelize.where(Sequelize.fn('WEEKDAY', Sequelize.col('called_at')), 0) : null,
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
