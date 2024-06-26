import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Connection } from '../models/connection.model';
import { UserService } from './user.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { RoleEnum } from '../models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  firestore: Firestore = inject(Firestore);

  connections = signal<Connection[]>([]);
  private connectionsSub: Subscription | null = null;

  constructor(private userService: UserService) {}

  loadConnectionsGlobally() {
    if (this.connectionsSub) return;
    this.connectionsSub = this.getConnections().subscribe((connections) => {
      console.log('Connections loaded globally', connections);
      this.connections.set(connections);
    });
  }

  destroyConnectionsSubscription() {
    this.connectionsSub?.unsubscribe();
    this.connectionsSub = null;
  }

  private getConnections() {
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
