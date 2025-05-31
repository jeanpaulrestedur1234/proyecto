import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  @Output() switchView = new EventEmitter<void>();

  goToRegister() {
    this.switchView.emit();
  }

  login() {
    console.log('Logging in with:', this.email, this.password, 'Remember:', this.rememberMe);
    // In a real application, you would send these credentials to your authentication service.
  }

}
