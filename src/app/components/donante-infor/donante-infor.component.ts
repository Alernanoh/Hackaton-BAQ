import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donante-infor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donante-infor.component.html',
  styleUrl: './donante-infor.component.css'
})
export class DonanteInforComponent {
  @Input() showImpactSection: boolean = true;
  @Input() currentAmount: number = 86245.30;
  @Input() goalAmount: number = 168347.46;
  @Input() donacionReciente: number = 0;

  get progress(): number {
    return Math.min(100, (this.currentAmount / this.goalAmount) * 100);
  }

  causeData = {
    title: 'Ayuda a alimentar a quien más lo necesita',
    beneficiaries: 'Fundación BAQ',
    description: "Tu ayuda llega donde más se necesita Cada día, en medio de los cerros y barrios de nuestra querida Quito, muchas familias enfrentan un reto silencioso: no tienen qué comer.Pero gracias a personas como tú, ese reto puede convertirse en esperanza. El Banco de Alimentos de Quito  lleva más de 20 años trabajando con pasión y compromiso para recuperar alimentos seguros y nutritivos y llevarlos a quienes más lo necesitan. Con tu apoyo, puedes cambiar vidas. ✓  Juntos reducimos el hambre y el desperdicio alimentario. ✓ Tus fondos nos permiten optimizar procesos, llegar más rápido y ayudar a más familias.",
    benefits: [
      'Cuatro comidas nutritivas diarias',
      'Atención médica básica',
      'Alojamiento seguro y digno'
    ],
    impact: [
      { amount: 12, description: 'alimenta a una persona durante 3 días' },
      { amount: 22, description: 'proporciona medicamentos básicos para una semana' },
      { amount: 36, description: 'cubre alimentación y atención médica durante una semana' },
      { amount: 100, description: 'asegura atención completa durante un mes' }
    ]
  };
}
