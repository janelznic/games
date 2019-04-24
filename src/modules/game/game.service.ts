import AppConfig from '../../consts/app.config';
import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { GameSearchParams } from './interfaces/game.interface';
import { ICheapSharkResponse } from './interfaces/cheapSharkResponse.interface';

@Injectable()
export class GameService {

  /**
   * Returns list of games
   */
  public async getGames(searchQuery: string, searchParams?: GameSearchParams): Promise<ICheapSharkResponse[]> {
    const gamesList = await this.fetchGameInfo(searchQuery, searchParams);
    return gamesList.data;
  }

  private async fetchGameInfo(searchQuery: string, searchParams?: GameSearchParams): Promise<AxiosResponse> {
    const api = AppConfig.api;
    const res = await Axios.get(`${api.baseUrl}/${api.version}/deals`, {
      data: {
        params: {
          ...searchParams,
          title: encodeURIComponent(searchQuery),
        }
      },
    });
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }
}
