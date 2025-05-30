import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logout() {
    console.log('User logged out');
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el token de autenticación o redirigir al usuario a la página de inicio de sesión.
  }

}
