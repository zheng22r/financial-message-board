import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { FlexLayoutModule } from "@angular/flex-layout";


import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ChartsModule } from "@progress/kendo-angular-charts";
import "hammerjs";
import "@progress/kendo-ui";
import { FooterComponent } from "./stock/components/footer/footer.component";
import { StocksComponent } from "./stock/components/stocks/stocks.component";
import { StockListComponent } from "./stock/components/stock-list/stock-list.component";
import { NavigationComponent } from "./stock/components/navigation/navigation.component";
import { HeatmapComponent } from "./stock/components/heatmap/heatmap.component";
import { BadgeComponent } from "./stock/components/badge/badge.component";
import { UserProfileComponent } from "./stock/components/user-profile/user-profile.component";
import { RealTimeDataComponent } from "./stock/components/real-time-data/real-time-data.component";
import { StockChartComponent } from "./stock/components/stock-chart/stock-chart.component";
import { StockDetailsComponent } from "./stock/components/stock-details/stock-details.component";
import { NumberFormatPipe } from "./stock/pipes/number-format.pipe";
import { DropDownListPopupSelectorDirective } from "./stock/directives/dropdownlist-popup-selector.directive";
import { ActionButtonsComponent } from "./stock/components/action-buttons/action-buttons.component";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { StockDataService } from "./stock/services/stock-data.service";
import { HeaderStockComponent } from "./stock/components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    FooterComponent,
    StocksComponent,
    StockListComponent,
    NavigationComponent,
    HeatmapComponent,
    BadgeComponent,
    UserProfileComponent,
    RealTimeDataComponent,
    StockChartComponent,
    StockDetailsComponent,
    NumberFormatPipe,
    DropDownListPopupSelectorDirective,
    ActionButtonsComponent,
    HeaderStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    FlexLayoutModule,
    DropDownsModule,
    BrowserAnimationsModule,
    GridModule,
    ButtonsModule,
    ChartsModule,
    DialogsModule,
    DateInputsModule,
    LayoutModule,
  ],
  providers: [
    StockDataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
