import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private scrollService: ScrollService) {}

  irADonar(event: MouseEvent) {
    event.preventDefault();
    this.scrollService.scrollToSection('proyecto');
  }
  irAVoluntariado(event: MouseEvent) {
    event.preventDefault();
    this.scrollService.scrollToSection('actualizaciones');
  }
}
