import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule] // Add CommonModule here
})
export class ContactComponent {
  motivos: string[] = [
    'Consultas',
    'Reclamos',
    'Sugerencias',
    'Devoluciones',
    'Otros'
  ];

  formData = {
    nombre: '',
    correo: '',
    apellido_paterno: '',
    apellido_materno: '',
    motivo: '',
    mensaje: ''
  };

  onSubmit(form: any) {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!soloLetras.test(this.formData.nombre)) {
      alert('El nombre solo puede contener letras y espacios.');
      return;
    }
    if (!soloLetras.test(this.formData.apellido_paterno)) {
      alert('El apellido paterno solo puede contener letras y espacios.');
      return;
    }
    if (!soloLetras.test(this.formData.apellido_materno)) {
      alert('El apellido materno solo puede contener letras y espacios.');
      return;
    }
    if (!emailRegex.test(this.formData.correo)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    if (!this.formData.motivo) {
      alert('Por favor, seleccione un motivo.');
      return;
    }
    if (this.formData.mensaje.length < 10) {
      alert('El mensaje debe tener al menos 10 caracteres.');
      return;
    }

    if (form.valid) {
      form.resetForm();
      // Mostrar modal de éxito usando Bootstrap JS
      const modalEl = document.getElementById('modalExito');
      if (modalEl) {
        // @ts-ignore
        const modal = new window.bootstrap.Modal(modalEl);
        modal.show();
      }
    } else {
      form.form.markAllAsTouched();
    }
  }
}
