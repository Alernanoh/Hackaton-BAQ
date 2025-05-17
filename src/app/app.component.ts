import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    FooterComponent,
    HeaderComponent
=======
import { CommonModule } from '@angular/common';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { DonacionCarritoComponent } from './components/donacion-carrito/donacion-carrito.component';
import { InfoDonanteComponent } from './components/info-donante/info-donante.component';
import { ResumenCampanaComponent } from './components/resumen-campana/resumen-campana.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductosListComponent,
    DonacionCarritoComponent,
    InfoDonanteComponent,
<<<<<<< HEAD
    ResumenCampanaComponent,
    FooterComponent
=======
    ResumenCampanaComponent
>>>>>>> 4236f75f3718f51872fd9e91d77eec973c61080d
>>>>>>> eefe7cd56ff42dddcc1761d7b0a8cb5365fab058
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
