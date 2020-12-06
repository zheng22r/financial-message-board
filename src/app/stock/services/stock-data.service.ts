import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

import { SelectionRange } from "@progress/kendo-angular-dateinputs";
import { MS_PER_MINUTE } from "@progress/kendo-date-math";

import { stocksInPortfolio, unsortedStocks } from "../data/stocks";
import { Stock } from "../models";
import { StockIntervalDetails } from "../models";

@Injectable()
export class StockDataService {
  public data: BehaviorSubject<Stock[]> = new BehaviorSubject(stocksInPortfolio);
  public selectedStock: Stock;

  public getStockIntervalDetails(symbol: string, range: SelectionRange, intervalInMinutes: number): StockIntervalDetails[] {
    const stock = stocksInPortfolio.concat(unsortedStocks).find(st => st.symbol === symbol);
    return this.generateDataForSymbol(stock, intervalInMinutes, range);
  }

  private generateDataForSymbol(stock: Stock, intervalInMinutes: number, range: SelectionRange): StockIntervalDetails[] {
    const data: StockIntervalDetails[] = [];

    const minutesPerDay = 1440;
    const standingPoint = {
      close: stock.intraday[0],
      volume: intervalInMinutes < minutesPerDay ?
        stock.volume / (minutesPerDay / intervalInMinutes) :
        stock.volume * (intervalInMinutes / minutesPerDay)
    };

    const intervalInMs = MS_PER_MINUTE * intervalInMinutes;
    const start = range.start.getTime() + intervalInMs;
    for (let dateInMs = start, index = 0; dateInMs <= range.end.getTime(); dateInMs += intervalInMs, index++) {
      const previousInterval = data[index - 1] || standingPoint;

      const random = Math.random() + 0.01;
      const volatility = 0.03;

      let cngP = 2 * volatility * random;
      if (cngP > volatility) {
        cngP -= (2 * volatility);
      }

      const change = Number(previousInterval.close) * cngP;
      const newPrice = Number(previousInterval.close) + change;
      const high = Math.max(newPrice, Number(previousInterval.close));
      const low = Math.min(newPrice, Number(previousInterval.close));

      data.push({
        open: Number(previousInterval.close.toFixed(2)),
        close: Number(newPrice.toFixed(2)),
        high: Number((high + (0.015 * high)).toFixed(2)),
        low: Number((low - (0.015 * low)).toFixed(2)),
        volume: this.getStocksPrice(standingPoint.volume),
        date: new Date(dateInMs)
      });
    }

    return data;
  }

  private getStocksPrice(oldValue: number): number {
    const coef = Number.parseFloat((Math.random()).toFixed(2));
    const newValue = Number.parseFloat((oldValue + (oldValue * coef / 1.5)).toFixed(0));
    const diff = newValue - oldValue;
    const sign = Math.random() >= 0.5 ? 1 : -1;

    return Number((oldValue + (diff * sign)).toFixed(0));
  }

  public getStockData(): Observable<Stock[]> {
    return this.data
      .pipe(map((stocks) => {
        return stocks;
      }));
  }
}
