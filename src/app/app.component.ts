import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { DonacionCarritoComponent } from './components/donacion-carrito/donacion-carrito.component';
import { ResumenCampanaComponent } from './components/resumen-campana/resumen-campana.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from "./components/form/form.component";
import { InformativoComponent } from "./components/informativo/informativo.component";
import { AyudaComponent } from "./components/ayuda/ayuda.component";
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ProductosListComponent,
    DonacionCarritoComponent,
    ResumenCampanaComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent,
    InformativoComponent,
    AyudaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(AyudaComponent) ayudaComponent!: AyudaComponent;
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
  seccionActiva: string | undefined;

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToSection$.subscribe((section: string) => {
      if (this.ayudaComponent) {
        this.ayudaComponent.cambiarSeccion(section);
      }
    });
  }

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

  irADonar(event: Event) {
    event.preventDefault();
    if (this.ayudaComponent) {
      this.ayudaComponent.cambiarSeccion('proyecto');
    }
  }

  irAVoluntariado(event: Event) {
    event.preventDefault();
    if (this.ayudaComponent) {
      this.ayudaComponent.cambiarSeccion('actualizaciones');
    }
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    setTimeout(() => {
      let id = '';
      if (seccion === 'productos') id = 'contenido-productos';
      if (seccion === 'proyecto') id = 'contenido-donardinero';
      if (seccion === 'actualizaciones') id = 'contenido-voluntariado';
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}
