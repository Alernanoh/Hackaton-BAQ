import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto: any;
  @Output() agregarProducto = new EventEmitter<any>();
  cantidad: number = 1;

  cambiarCantidad(delta: number) {
    if (this.cantidad + delta >= 1) {
      this.cantidad += delta;
    }
  }

  agregar() {
    this.agregarProducto.emit({ ...this.producto, cantidad: this.cantidad });
    this.cantidad = 1; // Reinicia después de agregar
  }
}
