import { Component } from '@angular/core';
import { AyudaComponent } from '../ayuda/ayuda.component';
import { ProductosListComponent } from '../productos-list/productos-list.component';
import { ResumenCampanaComponent } from '../resumen-campana/resumen-campana.component';
import { DonacionCarritoComponent } from '../donacion-carrito/donacion-carrito.component';
import { InfoDonanteComponent } from '../info-donante/info-donante.component';
import { FormComponent } from '../form/form.component';
import { InformativoComponent } from '../informativo/informativo.component';

@Component({
  selector: 'app-dona-proposito',
  imports: [AyudaComponent,
    ProductosListComponent,
    ResumenCampanaComponent,
    DonacionCarritoComponent,
    InfoDonanteComponent,
    FormComponent,
    InformativoComponent

  ],
  templateUrl: './dona-proposito.component.html',
  styleUrl: './dona-proposito.component.css'
})
export class DonaPropositoComponent {
  title = 'hackaton';
  carrito: any[] = [];

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
