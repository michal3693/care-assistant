import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { MenuItem } from 'src/app/models/menu-item.model';
import { RoleEnum } from 'src/app/models/role.enum';
import { ConnectRequestsService } from 'src/app/services/connect-requests.service';
import { ConnectionsService } from 'src/app/services/connections.service';
import { LoginService } from 'src/app/services/login.service';
import { TabsMenuService } from 'src/app/services/tabs-menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonContent,
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
  ],
})
export class AppLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [];
  role?: RoleEnum;

  constructor(
    private cdRef: ChangeDetectorRef,
    private loginService: LoginService,
    private tabsMenuService: TabsMenuService,
    private userService: UserService,
    private connectRequestsService: ConnectRequestsService,
    private connectionsService: ConnectionsService
  ) {}

  ngOnInit() {
    this.tabsMenuService.getMenuItems().then((menuItems) => {
      this.menuItems = menuItems;
      this.cdRef.markForCheck();
    });

    this.userService.getUserProfile().subscribe((user) => {
      this.role = user?.role;
      if (this.role === RoleEnum.Patient)
        this.connectRequestsService.loadConnectRequestsGlobally();
    });

    this.connectionsService.loadConnectionsGlobally();
  }

  logout() {
    this.loginService.logout();
  }
}
