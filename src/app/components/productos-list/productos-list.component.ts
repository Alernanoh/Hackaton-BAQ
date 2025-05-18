import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa esto
import { ProductoCardComponent } from '../producto-card/producto-card.component'; // Asegúrate de importar tu card

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent], // <-- Agrega CommonModule aquí
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent {
  @Input() productos: any[] = [];
  @Output() agregarProducto = new EventEmitter<any>();

  mostrarTodos = false;

  get productosMostrados() {
    return this.mostrarTodos ? this.productos : this.productos.slice(0, 6);
  }

  onAgregar(prod: any) {
    this.agregarProducto.emit(prod);
  }

  verMas() {
    this.mostrarTodos = true;
  }

  verMenos() {
    this.mostrarTodos = false;
  }
}
