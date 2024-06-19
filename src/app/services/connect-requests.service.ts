import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { ConnectRequest } from '../models/connect-request.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectRequestsService {
  firestore: Firestore = inject(Firestore);

  constructor(private userService: UserService) {}

  getConnectRequests() {
    return this.userService.getUserProfile().pipe(
      switchMap((user) => {
        const connectRequestsCollection = collection(
          this.firestore,
          'connectRequests'
        );
        const q = query(
          connectRequestsCollection,
          where('patientId', '==', user?.id)
        );
        return collectionData(q) as Observable<ConnectRequest[]>;
      })
    );
  }

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
            caregiverEmail: currentUser!.email,
            date: new Date().toISOString(),
          } as ConnectRequest)
        )
      )
      .pipe(map(() => SendConnectRequestResponsesEnum.REQUEST_SENT));
  }
}

export enum SendConnectRequestResponsesEnum {
  REQUEST_SENT = 'REQUEST_SENT',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}
