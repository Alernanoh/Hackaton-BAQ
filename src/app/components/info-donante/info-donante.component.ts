import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Agrega esto

@Component({
  selector: 'app-info-donante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Agrega CommonModule aquí
  templateUrl: './info-donante.component.html',
  styleUrls: ['./info-donante.component.css']
})
export class InfoDonanteComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      anonimo: [false],
      nombre: [''],
      apellido: ['']
    });
  }

  enviar() {
    console.log(this.formulario.value);
  }
}