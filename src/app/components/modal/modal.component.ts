import { Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  ngAfterViewInit(): void {
    const modalEl = document.getElementById('modalInformativo');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

}
