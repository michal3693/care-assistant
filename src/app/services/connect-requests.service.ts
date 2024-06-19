import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { map, of, switchMap, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectRequestsService {
  firestore: Firestore = inject(Firestore);

  constructor(private userService: UserService) {}

  sendConnectRequest(email: string) {
    return this.userService
      .getUserByEmail(email)
      .pipe(
        switchMap((user) =>
          user
            ? this.userService
                .getUserProfile()
                .pipe(map((currentUser) => ({ foundUser: user, currentUser })))
            : throwError(() => SendConnectRequestResponsesEnum.USER_NOT_FOUND)
        )
      )
      .pipe(
        switchMap(({ foundUser, currentUser }) =>
          addDoc(collection(this.firestore, 'connectRequests'), {
            caregiverId: currentUser!.id,
            patientId: foundUser.id,
          })
        )
      )
      .pipe(map(() => SendConnectRequestResponsesEnum.REQUEST_SENT));
  }
}

export enum SendConnectRequestResponsesEnum {
  REQUEST_SENT = 'REQUEST_SENT',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}
