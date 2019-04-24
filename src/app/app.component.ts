import { DataService } from "./data.service";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { UsersCount } from "./models";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Healthy Shopping Stats</span>
      </mat-toolbar-row>

      <mat-toolbar-row>
        <button mat-raised-button [routerLink]="['/count']">User Count</button>
      </mat-toolbar-row>
    </mat-toolbar>
    <section class="graphs">
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [
    ` :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
      }
      mat-toolbar {
        flex-grow: 0;
      }
      .graphs {
        flex-grow: 1;
      }
    `
  ]
})
export class AppComponent {
  usersCount: Observable<UsersCount>;

  constructor(private _data: DataService) {
    this.usersCount = this._data.usersCount;
  }
}
