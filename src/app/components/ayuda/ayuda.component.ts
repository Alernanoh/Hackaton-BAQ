import { Component } from '@angular/core';
import { DonacionCarritoComponent } from '../donacion-carrito/donacion-carrito.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { DonaPropositoComponent } from '../dona-proposito/dona-proposito.component';
import { ProductosListComponent } from '../productos-list/productos-list.component';
import { ProductoCardComponent } from '../producto-card/producto-card.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-ayuda',
  imports: [DonacionCarritoComponent,
    CommonModule,
    FormComponent
  ],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  seccionActiva: string = 'productos'; // Sección inicial
  title = 'hackaton';
  carrito: any[] = [];

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  productos = [
    {
      nombre: 'Kit de Alimentación Básico',
      descripcion: 'Proporciona alimentos para una semana',
      imagen: '/kit-alimentacion.png',
      precio: 7.75,
      obtenido: 1180,
      meta: 2000
    },
    {
      nombre: 'Kit de Higiene',
      descripcion: 'Incluye artículos básicos de aseo',
      imagen: '/kit-higiene.png',
      precio: 6.54,
      obtenido: 835,
      meta: 2000
    },
    {
      nombre: 'Botiquín de primeros auxilios',
      descripcion: 'Para emergencias básicas',
      imagen: '/botiquin.png',
      precio: 8.90,
      obtenido: 430,
      meta: 1000
    }
  ];

  agregarAlCarrito(producto: any) {
    const itemExistente = this.carrito.find(p => p.nombre === producto.nombre);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  quitarDelCarrito(producto: any) {
    const idx = this.carrito.findIndex(p => p.nombre === producto.nombre);
    if (idx > -1) {
      if (this.carrito[idx].cantidad > 1) {
        this.carrito[idx].cantidad--;
      } else {
        this.carrito.splice(idx, 1);
      }
    }
  }
}
