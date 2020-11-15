import { Component } from "@angular/core";
import { MS_PER_DAY, addDays } from "@progress/kendo-date-math";
import { SelectionRange } from "@progress/kendo-angular-dateinputs";
import { ItemArgs } from "@progress/kendo-angular-dropdowns";

import { Interval } from "../../models";
import { StockDataService } from "../../services/stock-data.service";
import { rangeAndIntervalCompatible } from "../../pipes/helpers";

@Component({
  selector: "app-stock-chart",
  templateUrl: "./stock-chart.component.html",
  styleUrls: ["./stock-chart.component.scss"]
})
export class StockChartComponent {
  public range: SelectionRange = {start: null, end: null};
  public normalizedRange: SelectionRange = {start: addDays(new Date(), -4), end: new Date()};

  public timeFilters: Array<{ name: string, duration: number }> = [
    {name: "1D", duration: MS_PER_DAY},
    {name: "4D", duration: MS_PER_DAY * 4},
    {name: "1W", duration: MS_PER_DAY * 7},
    {name: "1M", duration: MS_PER_DAY * 30},
    {name: "6M", duration: MS_PER_DAY * 30 * 6},
  ];
  public activeTimeFilter = this.timeFilters[2].duration;

  public intervals: Array<{ name: string, interval: Interval, duration: number }> = [
    {name: "1H", interval: {unit: "hours", step: 1}, duration: MS_PER_DAY / 24},
    {name: "4H", interval: {unit: "hours", step: 4}, duration: MS_PER_DAY / 6},
    {name: "1D", interval: {unit: "days", step: 4}, duration: MS_PER_DAY},
    {name: "1W", interval: {unit: "weeks", step: 4}, duration: MS_PER_DAY * 7}
  ];
  public selectedInterval: { name: string, interval: Interval, duration: number } = this.intervals[1];

  public chartType = "candle";
  public charts = [
    {text: "Candle", value: "candle"},
  ];

  private displayedDuration: number = this.activeTimeFilter;

  constructor(public stockDataService: StockDataService) {
  }

  public disableIncompatibleIntervals = (args: ItemArgs): boolean => {
    return !rangeAndIntervalCompatible(this.displayedDuration, args.dataItem.duration);
  };

  public onTimeFilterClick(duration: number): void {
    if (this.activeTimeFilter === duration) {
      return;
    }

    this.activeTimeFilter = duration;
    this.range = {start: null, end: null};

    this.normalizedRange = {
      start: new Date(new Date().getTime() - duration),
      end: new Date()
    };

    this.displayedDuration = duration;
    this.selectFirstCompatibleInterval(duration);
  }

  public selectFirstCompatibleInterval(displayedDuration: number): void {
    if (rangeAndIntervalCompatible(displayedDuration, this.selectedInterval.duration)) {
      return;
    }

    const firstCompatibleInterval = this.intervals.find(interval => rangeAndIntervalCompatible(displayedDuration, interval.duration));
    if (firstCompatibleInterval) {
      this.selectedInterval = firstCompatibleInterval;
    }
  }
}
