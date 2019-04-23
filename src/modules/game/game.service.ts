import AppConfig from '../../consts/app.config';
import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { ICheapSharkResponse } from './interfaces/cheapSharkResponse.interface';

@Injectable()
export class GameService {

  /**
   * Returns list of games
   */
  public async getGames(): Promise<ICheapSharkResponse[]> {
    const gamesList = await this.fetchGameInfo();
    return gamesList.data;
  }

  private async fetchGameInfo(): Promise<AxiosResponse> {
    const api = AppConfig.api;
    const res = await Axios.get(`${api.baseUrl}/${api.version}/deals?storeID=1&desc=0&title=grand%20theft%20auto&pageSize=20`);
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }
}
