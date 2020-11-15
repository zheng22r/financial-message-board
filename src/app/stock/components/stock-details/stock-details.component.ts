import { Component, ViewEncapsulation, Input, SimpleChanges, OnChanges } from "@angular/core";
import { SelectionRange } from "@progress/kendo-angular-dateinputs";
import { PlotBand } from "@progress/kendo-angular-charts";
import { Interval, TimeIntervalUnitsInMinutes, StockIntervalDetails } from "../../models";
import { StockDataService } from "../../services/stock-data.service";

@Component({
  selector: "app-stock-details",
  templateUrl: "./stock-details.component.html",
  styleUrls: ["./stock-details.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class StockDetailsComponent implements OnChanges {

  @Input() public chartType: "candle";

  @Input() public interval: Interval = {unit: "hours", step: 1};
  @Input() public range: SelectionRange = {start: null, end: null};
  @Input() public symbol: string;

  public stockData: StockIntervalDetails[];
  public volumeValueAxisMax: number;

  public candleChartAggregate = {
    open: (value: number[]) => value[0],
    close: (value: number[]) => value[value.length - 1],
    high: (value: number[]) => Math.max(...value),
    low: (value: number[]) => Math.min(...value),
    volume: (value: number[]) => value.reduce((total, current) => total + current, 0)
  };
  public categoryPlotBands: PlotBand[];

  private previousColumnChartItem: StockIntervalDetails;

  constructor(private stockDataService: StockDataService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.interval || changes.range || changes.symbol) {
      if (!(this.range.start && this.range.end)) {
        return;
      }

      const intervalInMinutes = this.interval.step * TimeIntervalUnitsInMinutes[this.interval.unit];
      this.stockData = this.stockDataService.getStockIntervalDetails(this.symbol, this.range, intervalInMinutes);
      this.configureVolumeValueAxisHeight();
      this.composeCategoryPlotBands();
    }
  }

  public itemColor = (args: any) => {
    const current: StockIntervalDetails = args.dataItem;
    const currentLargerThenPrev = !this.previousColumnChartItem || (current.volume >= this.previousColumnChartItem.volume);

    if (current.volume) {
      this.previousColumnChartItem = args.dataItem;
    }

    return currentLargerThenPrev ? "#5CB85C" : "#FF6358";
  };

  public configureVolumeValueAxisHeight(): void {
    this.volumeValueAxisMax = Math.max(...this.stockData.map(stock => stock.volume)) * 4;
  }

  private composeCategoryPlotBands(): void {
    this.categoryPlotBands = this.stockData.reduce((bands, current, index, allStocks) => {
      bands.push({
        from: current.date,
        to: (allStocks[index + 1] || current).date,
        color: index % 2 !== 0 ? "white" : "lightgrey",
        opacity: 0.2
      } as PlotBand);

      return bands;
    }, [] as PlotBand[]);
  }
}
