import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
