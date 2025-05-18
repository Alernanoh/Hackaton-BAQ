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
    title: 'Ayuda a 300 ancianos abandonados',
    beneficiaries: 'Fundación BAQ',
    description: 'Durante 20 años, Gopalan ha sido un salvavidas para ancianos abandonados. Con múltiples hogares en Mudichur, Pallikaranai, Valasaravakkam, Paalavakkam y Velapanchavadi, Akshaya Trust proporciona alimentos, atención médica y alojamiento digno a más de 300 personas mayores vulnerables.',
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
