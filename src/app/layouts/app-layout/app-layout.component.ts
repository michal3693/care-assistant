import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  IonContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
} from '@ionic/angular/standalone';
import { MenuItem } from 'src/app/models/menu-item.model';
import { LoginService } from 'src/app/services/login.service';
import { TabsMenuService } from 'src/app/services/tabs-menu.service';

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

  constructor(
    private loginService: LoginService,
    private tabsMenuService: TabsMenuService
  ) {}

  ngOnInit() {
    this.tabsMenuService
      .getMenuItems()
      .then((menuItems) => (this.menuItems = menuItems));
  }

  logout() {
    this.loginService.logout();
  }
}
