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

  mostrarModalPago = false;

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
}
