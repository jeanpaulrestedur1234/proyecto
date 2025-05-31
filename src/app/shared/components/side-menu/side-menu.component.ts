import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface MenuItem {
  label: string;
  path?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [CommonModule],
})
export class SideMenuComponent {
  isOpen = false;

  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      path: '/home'
    },
    {
      label: 'Proyectos',
      children: [
        { label: 'Nuevo Proyecto', path: '/proyectos/nuevo' },
        { label: 'Mis Proyectos', path: '/proyectos/mis-proyectos' }
      ]
    },
    {
      label: 'Usuarios',
      children: [
        { label: 'Crear Usuario', path: '/usuarios/crear' },
        { label: 'Lista de Usuarios', path: '/usuarios/lista' }
      ]
    }
  ];

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  navigateTo(path?: string): void {
    if (path) {
      this.router.navigate([path]);
      this.isOpen = false;
    }
  }
}
