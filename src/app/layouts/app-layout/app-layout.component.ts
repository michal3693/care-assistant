import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
export class AppLayoutComponent {
  menuItems: MenuItem[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private loginService: LoginService,
    private tabsMenuService: TabsMenuService
  ) {}

  ionViewWillEnter() {
    console.log('App layout init');
    this.tabsMenuService.getMenuItems().then((menuItems) => {
      this.menuItems = menuItems;
      this.cdRef.markForCheck();
    });
  }

  logout() {
    this.loginService.logout();
  }
}
