import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  tipoDonante: 'extranjero' | 'ecuatoriano' = 'extranjero';
  tipoIdentificacion: 'cedula' | 'ruc' = 'cedula';

  numeroIdentificacion: string = '';
  validado = false;
  cargando = false;

  datosValidados = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    actividad: '',
    estado: ''
  };

  constructor(private http: HttpClient) {}

  cambiarTipoDonante(tipo: 'extranjero' | 'ecuatoriano') {
    this.tipoDonante = tipo;
    this.validado = false;
    this.numeroIdentificacion = '';
    this.cargando = false;
  }

  volverAEmpezar() {
    this.validado = false;
    this.numeroIdentificacion = '';
    this.cargando = false;
    this.datosValidados = {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      actividad: '',
      estado: ''
    };
  }

  validarIdentificacion() {
    const tipo = this.tipoIdentificacion;
    const valor = this.numeroIdentificacion;

    if (tipo === 'cedula' && valor.length !== 10) {
      alert('Número de cédula inválido (debe tener 10 dígitos)');
      return;
    }

    if (tipo === 'ruc' && valor.length !== 13) {
      alert('Número de RUC inválido (debe tener 13 dígitos)');
      return;
    }

    this.cargando = true;

    const url = `http://localhost:3000/api/cedula?tipo=${tipo}&identificacion=${valor}`;

    this.http.get<any>(url).subscribe({
      next: (resp) => {
        this.validado = true;

        if (resp.tipo === 'cedula') {
          this.datosValidados = {
            nombre: resp.nombre || '',
            apellido: resp.apellido || '',
            correo: '',
            telefono: '',
            actividad: '',
            estado: ''
          };
        }

        if (resp.tipo === 'ruc') {
          this.datosValidados = {
            nombre: resp.razonSocial || '',
            apellido: resp.nombreFantasia || '',
            correo: '',
            telefono: '',
            actividad: resp.actividad || '',
            estado: resp.estado || ''
          };
        }

        this.cargando = false;
      },
      error: (err) => {
        this.validado = false;
        this.cargando = false;
        console.error(err);
        alert(err.error?.error || 'Error al validar la identificación.');
      }
    });
  }
}
