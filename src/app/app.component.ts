import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AyudaComponent } from "./components/ayuda/ayuda.component";
import { ScrollService } from './services/scroll.service';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    AyudaComponent,
    ModalComponent,
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
      nombre: 'Kit de Proteina',
      descripcion: 'Incluye proteínas de origen animal y vegetal.',
      imagen: '/kit_proteina.jpg',
      precio: 20.54,
      obtenido: 835,
      meta: 2000
    },
    {
      nombre: 'Kit de Vegetales',
      descripcion: 'Incluye vegetales contundentes para comidas.',
      imagen: '/kit_vegetales.jpg',
      precio: 9.50,
      obtenido: 430,
      meta: 1000
    },
    {
      nombre: 'Kit de lácteos',
      descripcion: 'Lácteos varios para consumir.',
      imagen: '/kit_lacteos.jpg',
      precio: 13.90,
      obtenido: 430,
      meta: 1000
    },
    {
      nombre: 'Kit de granos',
      descripcion: 'Granos varios que incluyen proteína y firba.',
      imagen: '/kit_granos.avif',
      precio: 10.90,
      obtenido: 430,
      meta: 1000
    }
  ];
  seccionActiva: string | undefined;

  constructor(private scrollService: ScrollService) { }

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
