import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersCount, UsersEngagement } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: Observable<any[]>;

  $usersCount = new BehaviorSubject<UsersCount>(null);
  $usersEngagement = new BehaviorSubject<UsersEngagement>(null);

  constructor(private _db: AngularFirestore) {
    this.users = from(
      this._db.collection('users').snapshotChanges()
    ).pipe(
      map(collectionSnapshot => collectionSnapshot.map(docSnapshot => docSnapshot.payload.doc.data()))
    )

    this.users.subscribe(users => {
      const usersCount = new UsersCount();
      const usersEngagement = new UsersEngagement();

      users.forEach(u => {
        usersCount.count(u.type)
        usersEngagement.process(u.type, u.clicks);
      });

      this.$usersCount.next(usersCount);
      this.$usersEngagement.next(usersEngagement);
    })
  }

}
