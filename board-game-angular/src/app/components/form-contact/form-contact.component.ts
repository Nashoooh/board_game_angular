import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // Declarar Bootstrap para usar el modal

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent {
  contactForm: FormGroup;
  motivos: string[] = ['Consulta', 'Soporte', 'Sugerencia', 'Otro']; // Lista de motivos

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario de contacto válido:', this.contactForm.value);

      // Mostrar el modal de éxito
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();

      // Limpiar el formulario después de mostrar el modal
      this.contactForm.reset();
    } else {
      console.log('Formulario de contacto inválido');
    }
  }
}