import AppConfig from '../../consts/app.config';
import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { IGame, GameSearchParams } from './interfaces/game.interface';
import { ICheapSharkGame } from './interfaces/cheapSharkGame.interface';
import { ICheapSharkDeal } from './interfaces/cheapSharkDeal.interface';

@Injectable()
export class GameService {
  apiUrl: string;

  constructor() {
    this.apiUrl = `${AppConfig.api.baseUrl}/${AppConfig.api.version}`;
  }

  /**
   * Returns list of games
   * @param searchQuery Name of the game
   * @param searchParams Query parameters
   */
  public async getGames(searchQuery: string, searchParams?: GameSearchParams): Promise<IGame[]> {
    const dealList = await this.fetchDeals(searchQuery, searchParams);

    const games = dealList.map(async deal => {
      const item = await this.fetchDealDetail(deal.dealID);

      return {
        name: item.gameInfo.name,
        salePrice: Number(item.gameInfo.salePrice),
        cheapestPrice: Number(item.cheapestPrice.price),
        releaseDate: new Date(item.gameInfo.releaseDate * 1000),
      };
    });

    return await Promise.all(games);
  }

  /**
   * Fetch list of deals
   * @param searchQuery Name of the game
   * @param searchParams Query parameters
   */
  private async fetchDeals(searchQuery: string, searchParams?: GameSearchParams): Promise<ICheapSharkGame[]> {
    const res = await Axios.get(
      `${this.apiUrl}/deals?title=${encodeURI(searchQuery)}`
       + `&storeID=${searchParams.storeID}`
       + `&desc=${searchParams.desc}`
       + `&pageSize=${searchParams.pageSize}`,
    );
    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching deals data');
  }

  /**
   * Fetch deal detail
   * @param id Deal ID
   */
  private async fetchDealDetail(id: string): Promise<ICheapSharkDeal> {
    const res = await Axios.get(`${this.apiUrl}/deals?id=${id}`);

    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching deal detail');
  }
}
