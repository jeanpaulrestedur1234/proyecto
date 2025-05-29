import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = '';
  password = '';
  rememberMe = false;

  login() {
    console.log('Logging in with:', this.email, this.password, 'Remember:', this.rememberMe);
    // In a real application, you would send these credentials to your authentication service.
  }
}