import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersCount } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: Observable<any[]>;

  $usersCount = new Subject<UsersCount>();

  constructor(private _db: AngularFirestore) {
    this.users = from(
      this._db.collection('users').snapshotChanges()
    ).pipe(
      map(collectionSnapshot => collectionSnapshot.map(docSnapshot => docSnapshot.payload.doc.data()))
    )

    this.users.subscribe(users => {
      const usersCount = new UsersCount();
      users.forEach(u => {
        usersCount.count(u.type)
      });

      this.$usersCount.next(usersCount);
    })
  }

  get usersCount(): Observable<UsersCount> {
    return this.$usersCount;
  }

}
