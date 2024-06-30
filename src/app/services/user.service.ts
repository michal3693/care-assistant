import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private userProfile = new BehaviorSubject<User | null>(null);

  constructor(private loginService: LoginService) {
    this.loginService
      .getLogoutObservable()
      .subscribe(() => this.userProfile.next(null));
  }

  getUserProfile() {
    if (this.userProfile.value) return this.userProfile.pipe(take(1));

    return new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        if (user) {
          const userDoc = doc(this.firestore, `users/${user.uid}`);
          docData(userDoc)
            .pipe(take(1))
            .subscribe((user) => {
              this.userProfile.next(user as User);
              observer.next(user as User);
            });
        } else observer.next(null);
      });
    });
  }

  getUserByEmail(email: string) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    return collectionData(q)
      .pipe(take(1))
      .pipe(map((users) => users[0] as User | undefined));
  }
}
