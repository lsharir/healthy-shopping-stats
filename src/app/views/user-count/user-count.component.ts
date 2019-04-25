import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../../data.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.scss']
})
export class UserCountComponent implements OnInit {
  usersCount: Observable<{value: number, name: string }[]>;
  view = new BehaviorSubject([Math.min(window.innerWidth, 700), Math.min(window.innerHeight * 0.67, 400)]);
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _data: DataService) {}

  ngOnInit() {
    this.usersCount = this._data.$usersCount.pipe(
      filter(usersCount => !!usersCount),
      map(usersCount => usersCount.forChart())
    );
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.view.next([Math.min(window.innerWidth, 700), Math.min(window.innerHeight * 0.67, 400)]);
  }

}
