import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SideMenuComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
