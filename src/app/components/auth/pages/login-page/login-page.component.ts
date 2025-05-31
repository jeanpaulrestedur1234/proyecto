import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../../components/login/login.component';
import {RegisterComponent} from '../../components/register/register.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule,LoginComponent, RegisterComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
   showLogin: boolean = true;
}