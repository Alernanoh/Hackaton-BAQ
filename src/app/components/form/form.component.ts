import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare const paypal: any;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  @ViewChild('paypalContainer', { static: false }) paypalContainer!: ElementRef;

  tipoDonante: 'extranjero' | 'ecuatoriano' = 'extranjero';
  tipoIdentificacion: 'cedula' | 'ruc' = 'cedula';

  numeroIdentificacion: string = '';
  validado = false;
  cargando = false;
  mostrarBotonPaypal = false;

  datosValidados = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    actividad: '',
    estado: ''
  };

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // se utiliza setTimeout en mostrarPaypal()
  }

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

  pagarConPayPhone() {
    const monto = 2200; // En centavos (22.00)
    const numero = '0987654321'; // Teléfono simulado

    this.http.post('http://localhost:3000/api/payphone', {
      amount: monto,
      phoneNumber: numero,
      cedula: '0501234567'
    }).subscribe({
      next: (resp: any) => {
        window.location.href = resp.paymentUrl;
      },
      error: err => {
        alert('Error al iniciar pago con PayPhone');
        console.error(err);
      }
    });
  }

  mostrarPaypal() {
    this.mostrarBotonPaypal = true;

    setTimeout(() => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '22.00' // Monto fijo por ahora
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log('✅ Pago PayPal exitoso:', order);
          alert('¡Gracias por tu donación vía PayPal!');
        },
        onError: (err: any) => {
          console.error('❌ Error con PayPal:', err);
          alert('Ocurrió un error con PayPal.');
        }
      }).render(this.paypalContainer.nativeElement);
    }, 100);
  }

  validarIdentificacion() {
    const tipo = this.tipoIdentificacion;
    const valor = this.numeroIdentificacion;

    if (tipo === 'cedula' && valor.length !== 10) {
      alert('Número de cédula inválido');
      return;
    }

    if (tipo === 'ruc' && valor.length !== 13) {
      alert('Número de RUC inválido');
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
