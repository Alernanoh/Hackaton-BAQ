import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto: any;
  @Output() agregarProducto = new EventEmitter();

  agregar() {
    this.agregarProducto.emit(this.producto);
  }
}
