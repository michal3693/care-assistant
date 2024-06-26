import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {
  Observable,
  Subscription,
  asapScheduler,
  catchError,
  map,
  scheduled,
  switchMap,
  throwError,
} from 'rxjs';
import { ConnectRequest } from '../models/connect-request.model';
import { Connection } from '../models/connection.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectRequestsService {
  firestore: Firestore = inject(Firestore);

  connectRequests = signal<ConnectRequest[]>([]);
  private connectRequestsSub: Subscription | null = null;

  constructor(private userService: UserService) {}

  loadConnectRequestsGlobally() {
    if (this.connectRequestsSub) return;

    this.connectRequestsSub = this.getConnectRequests().subscribe(
      (connectRequests) => this.connectRequests.set(connectRequests)
    );
  }

  destroyConnectRequestsSubscription() {
    this.connectRequestsSub?.unsubscribe();
    this.connectRequestsSub = null;
  }

  private getConnectRequests() {
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

  acceptConnectRequest(request: ConnectRequest) {
    const docRef = doc(this.firestore, 'connectRequests', request.id);

    return this.userService
      .getUserProfile()
      .pipe(
        switchMap((user) =>
          scheduled(deleteDoc(docRef), asapScheduler).pipe(map(() => user))
        )
      )
      .pipe(
        switchMap((user) => {
          const connectionDocRef = doc(
            collection(this.firestore, 'connections')
          );
          const connectionDocId = connectionDocRef.id;

          return setDoc(connectionDocRef, {
            id: connectionDocId,
            caregiverId: request.caregiverId,
            patientId: request.patientId,
            patientEmail: user!.email,
            caregiverEmail: request.caregiverEmail,
            date: new Date().toISOString(),
          } as Connection);
        })
      )
      .pipe(
        catchError(() =>
          throwError(() => AcceptConnectRequestResponsesEnum.REQUEST_ERROR)
        )
      )
      .pipe(map(() => AcceptConnectRequestResponsesEnum.REQUEST_ACCEPTED));
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
        switchMap(({ foundUser, currentUser }) => {
          const requestDocRef = doc(
            collection(this.firestore, 'connectRequests')
          );
          const requestDocId = requestDocRef.id;

          return setDoc(requestDocRef, {
            id: requestDocId,
            caregiverId: currentUser!.id,
            patientId: foundUser.id,
            caregiverEmail: currentUser!.email,
            date: new Date().toISOString(),
          } as ConnectRequest);
        })
      )
      .pipe(map(() => SendConnectRequestResponsesEnum.REQUEST_SENT));
  }
}

export enum SendConnectRequestResponsesEnum {
  REQUEST_SENT = 'REQUEST_SENT',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export enum AcceptConnectRequestResponsesEnum {
  REQUEST_ACCEPTED = 'REQUEST_ACCEPTED',
  REQUEST_ERROR = 'REQUEST_ERROR',
}
