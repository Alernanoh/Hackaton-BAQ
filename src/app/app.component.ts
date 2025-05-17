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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductosListComponent,
    DonacionCarritoComponent,
    InfoDonanteComponent,
    ResumenCampanaComponent
>>>>>>> 4236f75f3718f51872fd9e91d77eec973c61080d
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
      imagen: 'assets/kit-alimentacion.png',
      precio: 7.75,
      obtenido: 1180,
      meta: 2000
    },
    {
      nombre: 'Kit de Higiene',
      descripcion: 'Incluye artículos básicos de aseo',
      imagen: 'assets/kit-higiene.png',
      precio: 6.54,
      obtenido: 835,
      meta: 2000
    },
    {
      nombre: 'Botiquín de primeros auxilios',
      descripcion: 'Para emergencias básicas',
      imagen: 'assets/botiquin.png',
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
}
