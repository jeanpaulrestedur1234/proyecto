import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  @Output() switchView = new EventEmitter<void>();

  goToRegister() {
    this.switchView.emit();
  }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí va la lógica de registro (llamada al servicio, etc.)
    console.log('Registrando usuario:', this.name, this.email);
  }

}
