import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCountComponent } from './views/user-count/user-count.component';
import { HomeComponent } from './views/home/home.component';
import { UserEngagementComponent } from './views/user-engagement/user-engagement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'count', component: UserCountComponent },
  { path: 'clicks', component: UserEngagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
