import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-voluntario',
  imports: [FormsModule,
    CommonModule],
  templateUrl: './form-voluntario.component.html',
  styleUrl: './form-voluntario.component.css'
})
export class FormVoluntarioComponent {
  voluntario = {
    nombres: '',
    apellidos: '',
    correo: '',
    ciudad: '',
    provincia: '',
    telefono: '',
    institucion: 'Universidad',
    aceptaTerminos: false
  };

  mostrarModalConfirmacion = false;

  onSubmit() {
    const form = document.querySelector('.needs-validation');
    if (form) {
      form.classList.add('was-validated');
    }
    if (this.voluntario.aceptaTerminos) {
      this.mostrarModalConfirmacion = true;
    }
  }

  cerrarModalConfirmacion() {
    this.mostrarModalConfirmacion = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Redirige al inicio (ajusta si usas router)
    window.location.href = '/';
  }
}
