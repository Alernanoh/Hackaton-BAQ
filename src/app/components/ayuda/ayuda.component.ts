import { Component } from '@angular/core';
import { DonacionCarritoComponent } from '../donacion-carrito/donacion-carrito.component';
import { CommonModule } from '@angular/common';
import { ProductosListComponent } from '../productos-list/productos-list.component';
import { FormComponent } from '../form/form.component';
import { InformativoComponent } from '../informativo/informativo.component';
import { FormVoluntarioComponent } from '../form-voluntario/form-voluntario.component';
import { DonanteInforComponent } from "../donante-infor/donante-infor.component";

@Component({
  selector: 'app-ayuda',
  imports: [DonacionCarritoComponent,
    CommonModule,
    FormComponent,
    ProductosListComponent,
    InformativoComponent,
    FormVoluntarioComponent, DonanteInforComponent],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  seccionActiva: string = 'productos'; // Sección inicial
  title = 'hackaton';
  carrito: any[] = [];

  donacionReciente = 0;
goalAmount: number = 800000;
currentAmount: number = 500000;

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
      itemExistente.cantidad += producto.cantidad || 1;
    } else {
      this.carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
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

  sumarDonacion(monto: number) {
    this.donacionReciente = monto;
    // Sumar con animación
    const inicio = this.currentAmount;
    const fin = inicio + monto;
    const duracion = 5000; // 5 segundos
    let start: number | null = null;

    // Enfasis visual: agrega clase animada a la barra
    const barra = document.querySelector('.barra-progreso .progreso');
    if (barra) barra.classList.add('animada');

    const animar = (timestamp: number) => {
      if (!start) start = timestamp;
      const progreso = Math.min((timestamp - start) / duracion, 1);
      this.currentAmount = +(inicio + (fin - inicio) * progreso).toFixed(2);
      if (progreso < 1) {
        requestAnimationFrame(animar);
      } else {
        this.currentAmount = fin;
        setTimeout(() => this.donacionReciente = 0, 5000);
        // Quita el enfasis después de la animación
        if (barra) barra.classList.remove('animada');
      }
    };
    requestAnimationFrame(animar);

    // Opcional: limpiar carrito
    this.carrito = [];
    // No hagas scroll aquí, solo al cerrar el modal
  }

  agradecimientoVisible = false;
  donacionRecienteMonto = 0;

  onDonacionExitosa(monto: number) {
    this.donacionRecienteMonto = monto;
    this.agradecimientoVisible = true;
    // NO LLAMES sumarDonacion aquí
  }

  cerrarAgradecimiento() {
    this.agradecimientoVisible = false;
    // Suma la donación con animación
    this.sumarDonacion(this.donacionRecienteMonto);

    // Scroll hasta el banner de la barra de progreso, solo un poco arriba
    setTimeout(() => {
      const banner = document.querySelector('.banner-causa');
      if (banner) {
        const y = (banner as HTMLElement).getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  }
}
