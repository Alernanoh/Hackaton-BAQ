import { Component } from '@angular/core';
import { DonacionCarritoComponent } from '../donacion-carrito/donacion-carrito.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-ayuda',
  imports: [DonacionCarritoComponent, CommonModule,
    AppComponent
  ],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  seccionActiva: string = 'productos'; // Sección inicial

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }
}
