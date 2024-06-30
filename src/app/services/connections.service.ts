import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Connection } from '../models/connection.model';
import { RoleEnum } from '../models/role.enum';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  firestore: Firestore = inject(Firestore);

  connections = signal<Connection[]>([]);
  private connectionsSub: Subscription | null = null;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.loginService.getLogoutObservable().subscribe(() => {
      this.connections.set([]);
      this.connectionsSub?.unsubscribe();
      this.connectionsSub = null;
    });
  }

  loadConnectionsGlobally() {
    if (this.connectionsSub) return;
    this.connectionsSub = this.getConnections().subscribe((connections) =>
      this.connections.set(connections)
    );
  }

  getConnections() {
    return this.userService.getUserProfile().pipe(
      switchMap((user) => {
        const connectionsCollection = collection(this.firestore, 'connections');
        const q = query(
          connectionsCollection,
          where(this.getIdKeyByRole(user!.role), '==', user?.id)
        );
        return collectionData(q) as Observable<Connection[]>;
      })
    );
  }

  private getIdKeyByRole(role: RoleEnum) {
    switch (role) {
      case RoleEnum.Patient:
        return 'patientId';
      case RoleEnum.Caregiver:
        return 'caregiverId';
      default:
        throw new Error('Role not supported');
    }
  }
}
