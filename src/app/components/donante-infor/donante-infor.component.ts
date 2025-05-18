import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-donante-infor',
  imports: [],
  templateUrl: './donante-infor.component.html',
  styleUrl: './donante-infor.component.css'
})
export class DonanteInforComponent {

  @Input() showImpactSection: boolean = true;
  
  causeData = {
    title: 'UN HOGAR QUE SANA, UNA FAMILIA QUE CUIDA',
    beneficiaries: 'Ancianos beneficiarios',
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
