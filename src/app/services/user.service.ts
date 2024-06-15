import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private userProfile = new BehaviorSubject<User | null>(null);

  getUserProfile() {
    if (this.userProfile.value)
      return this.userProfile.asObservable().pipe(take(1));

    return new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        if (user) {
          const userDoc = doc(this.firestore, `users/${user.uid}`);
          docData(userDoc).subscribe((user) => {
            this.userProfile.next(user as User);
            observer.next(user as User);
          });
        } else observer.next(null);
      });
    });
  }

  clearUserProfile() {
    this.userProfile.next(null);
  }
}
