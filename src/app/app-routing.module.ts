import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { StocksComponent } from "./stock/components/stocks/stocks.component";
import { HeatmapComponent } from "./stock/components/heatmap/heatmap.component";
import { RealTimeDataComponent } from "./stock/components/real-time-data/real-time-data.component";
import { UserProfileComponent } from "./stock/components/user-profile/user-profile.component";

const routes: Routes = [
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "stocks", component: StocksComponent },
  { path: "heatmap", component: HeatmapComponent },
  { path: 'real-time', component: RealTimeDataComponent },
  { path: "profile", component: UserProfileComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
