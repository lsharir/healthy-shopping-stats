import { DataService } from "./data.service";
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Healthy Shopping Stats</span>
      </mat-toolbar-row>

      <mat-toolbar-row>
        <button mat-flat-button [routerLink]="['/']" [color]="router?.url === '/' ? 'primary' : 'default'">Home</button>
        <button mat-flat-button [routerLink]="['/count']" [color]="router?.url === '/count' ? 'primary' : 'default'">User Count</button>
        <button mat-flat-button [routerLink]="['/clicks']" [color]="router?.url === '/clicks' ? 'primary' : 'default'">User Engagement</button>
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
      button {
        margin-right: 0.5rem;
      }
    `
  ]
})
export class AppComponent {
  constructor(private _data: DataService, public router: Router) {
    
  }

  ngOnChanges() {
    console.log(this.router.url);
  }
}
