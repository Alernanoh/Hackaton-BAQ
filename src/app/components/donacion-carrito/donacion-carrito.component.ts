import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-donacion-carrito',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './donacion-carrito.component.html',
  styleUrls: ['./donacion-carrito.component.css']
})
export class DonacionCarritoComponent {
  @Input() carrito: any[] = [];
  @Output() quitarProducto = new EventEmitter<any>();
  @Output() donacionExitosa = new EventEmitter<number>();

  mostrarModalPago = false;
  agradecimientoVisible = false;
  donacionRecienteMonto = 0;

  get subtotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  get cargosPasarela(): number {
    return +(this.subtotal * 0.03).toFixed(2);
  }

  get total(): number {
    return +(this.subtotal + this.cargosPasarela).toFixed(2);
  }

  abrirPagoCarrito() {
    this.mostrarModalPago = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarPagoCarrito() {
    this.mostrarModalPago = false;
    document.body.style.overflow = '';
  }

  onDonacionExitosa(monto: number) {
    this.cerrarPagoCarrito();
    this.donacionRecienteMonto = monto;
    this.agradecimientoVisible = true;
    // Emitimos el monto para la barra de progreso
    this.donacionExitosa.emit(monto);
  }

  cerrarAgradecimiento() {
    this.agradecimientoVisible = false;
    // Opcional: scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cambiarCantidad(item: any, delta: number) {
    const idx = this.carrito.findIndex(p => p.nombre === item.nombre);
    if (idx > -1) {
      const nueva = this.carrito[idx].cantidad + delta;
      if (nueva >= 1) {
        this.carrito[idx].cantidad = nueva;
      }
    }
  }
}
