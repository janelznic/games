import { Injectable } from '@nestjs/common';
import { Call, GetCallsOptions } from './interfaces/call.interface';
import CallModel from './call.model';
import { Sequelize } from 'sequelize';
import { daysOfWeek } from './call.consts';

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
      let where: any = null;
      if (opt && opt.dayInWeek) {
        if (daysOfWeek.hasOwnProperty(opt.dayInWeek)) {
          where = Sequelize.where(Sequelize.fn('WEEKDAY', Sequelize.col('called_at')), daysOfWeek[opt.dayInWeek]);
        } else {
          throw new Error(`Specified day ${opt.dayInWeek} is not included in daysOfWeek constant`);
        }
      }
      const calls: Call[] = CallModel.findAll({
        where, order: [['id', 'ASC']],
      }).then(call => {
        return call;
      });
      return calls;
    } catch (error) {
      throw new Error('Error reading calls from database');
    }
  }
}
