import { Component, OnInit, HostListener } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: "app-user-engagement",
  templateUrl: "./user-engagement.component.html",
  styleUrls: ["./user-engagement.component.scss"]
})
export class UserEngagementComponent implements OnInit {
  usersEngagement: Observable<{}[]>;
  view = new BehaviorSubject([
    Math.min(window.innerWidth, 700),
    Math.min(window.innerHeight * 0.67, 400)
  ]);

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor(private _data: DataService) {}

  ngOnInit() {
    this.usersEngagement = this._data.$usersEngagement.pipe(
      filter(usersEngagement => !!usersEngagement),
      map(usersEngagement => usersEngagement.forChart())
    );
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.view.next([
      Math.min(window.innerWidth, 700),
      Math.min(window.innerHeight * 0.67, 400)
    ]);
  }
}
