import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { asapScheduler, scheduled, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);

  constructor() {}

  createAccount(email: string, password: string, role: string) {
    return scheduled(
      createUserWithEmailAndPassword(this.auth, email, password),
      asapScheduler
    ).pipe(
      switchMap((userCredential) =>
        setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
          id: userCredential.user.uid,
          email,
          role,
        })
      )
    );
  }
}
