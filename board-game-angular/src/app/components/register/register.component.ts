import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any; // Declare bootstrap for modal

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  formData = {
    nombre: '',
    usuario: '',
    correo: '',
    clave: '',
    clave2: '',
    nacimiento: '',
    direccion: '' // Optional field
  };

  ngOnInit(): void {
    const inputNacimiento = document.getElementById('nacimiento') as HTMLInputElement;
    if (inputNacimiento) {
      const hoyStr = new Date().toISOString().split('T')[0];
      inputNacimiento.setAttribute('max', hoyStr);
    }
  }

  onSubmit(form: any): void {
    // Validaciones
    if (!this.formData.nombre || !this.formData.usuario || !this.formData.correo || !this.formData.clave || !this.formData.clave2 || !this.formData.nacimiento) {
      alert("Todos los campos son obligatorios excepto la dirección.");
      return;
    }

    // Solo letras y espacios para nombre
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
    if (!soloLetras.test(this.formData.nombre)) {
      alert("El nombre solo puede contener letras y espacios.");
      // form.controls['nombre'].markAsTouched(); // Consider using Angular forms for better error handling
      return;
    }

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.formData.correo)) {
      alert("Ingrese un correo electrónico válido.");
      // form.controls['correo'].markAsTouched();
      return;
    }

    // Contraseñas iguales
    if (this.formData.clave !== this.formData.clave2) {
      alert("Las contraseñas no coinciden.");
      // form.controls['clave2'].markAsTouched();
      return;
    }

    // Contraseña: 6-18 caracteres, al menos un número, una mayúscula y puede contener @$!%*?&.
    const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.]{6,18}$/;
    if (!passRegex.test(this.formData.clave)) {
      alert("La contraseña debe tener entre 6 y 18 caracteres, al menos una mayúscula, un número y puede contener caracteres especiales como @$!%*?&.");
      // form.controls['clave'].markAsTouched();
      return;
    }

    // Edad mínima 13 años
    const fechaNac = new Date(this.formData.nacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    if (edad < 13) {
      alert("Debes tener al menos 13 años para registrarte.");
      // form.controls['nacimiento'].markAsTouched();
      return;
    }

    // Si todo OK, mostrar modal de éxito
    if (form.valid) {
        console.log('Formulario válido, datos:', this.formData);
        form.resetForm();
        this.formData = { // Reset formData as well
            nombre: '',
            usuario: '',
            correo: '',
            clave: '',
            clave2: '',
            nacimiento: '',
            direccion: ''
        };
        const modalExito = document.getElementById('modalExito');
        if (modalExito) {
            const modal = new bootstrap.Modal(modalExito);
            modal.show();
        }
    } else {
        console.log('Formulario inválido');
        Object.keys(form.controls).forEach(field => {
            const control = form.controls[field];
            control.markAsTouched({ onlySelf: true });
        });
    }
  }

  onLimpiar(form: any): void {
    form.resetForm();
    this.formData = {
        nombre: '',
        usuario: '',
        correo: '',
        clave: '',
        clave2: '',
        nacimiento: '',
        direccion: ''
    };
  }
}
