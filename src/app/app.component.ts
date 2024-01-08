import { Component, OnInit, } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // testing testing
  constructor(
    private authService: AuthService,
  ) {}
    // testing,,, this is a testing branch
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
