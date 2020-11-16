import { Component, ViewEncapsulation, OnDestroy } from "@angular/core";
import { SelectionEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { Subscription } from "rxjs";
import { Stock } from "../../models";
import { StockDataService } from "../../services/stock-data.service";

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class StockListComponent implements OnDestroy {
  public selectedRows: Array<string>;
  public sort: SortDescriptor[] = [];
  public StockList: Stock[];

  private confirmRemoveStockSubscription: Subscription;

  constructor(
    public stockDataService: StockDataService,
  ) {
    this.stockDataService.getStockData()
      .subscribe(data => this.StockList = data);

    if (this.StockList && this.StockList.length) {
      this.stockDataService.selectedStock = this.StockList[0];
      this.selectedRows = [this.StockList[0].symbol];
    }
  }

  public SelectCompanyStock(event: SelectionEvent): void {
    if (!(event.selectedRows && event.selectedRows.length)) {
      this.selectedRows = [this.stockDataService.selectedStock.symbol];
      return;
    }

    this.stockDataService.selectedStock = event.selectedRows[0].dataItem;
  }

  public ngOnDestroy(): void {
    if (this.confirmRemoveStockSubscription) {
      this.confirmRemoveStockSubscription.unsubscribe();
    }
  }
}
