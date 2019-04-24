import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCountComponent } from './views/user-count/user-count.component';

const routes: Routes = [
  { path: 'count', component: UserCountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
