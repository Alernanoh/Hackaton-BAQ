import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-campana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-campana.component.html',
  styleUrls: ['./resumen-campana.component.css']
})
export class ResumenCampanaComponent {
  gastosConstruccion = 60532.69;
  cargosPasarela = 2487.89;
  totalCampana = 168347.46;
}
