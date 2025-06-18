import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
declare var bootstrap: any; // Declarar Bootstrap para usar el modal

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      clave: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&.]{6,18}$')
        ]
      ],
      clave2: ['', [Validators.required]],
      nacimiento: ['', [Validators.required, this.validarEdadMinima(13)]], // Validar que sea mayor de 13 años
      direccion: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario válido:', this.registerForm.value);

      // Mostrar el modal de éxito
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();

      // Limpiar el formulario después de mostrar el modal
      this.onLimpiar();
    } else {
      console.log('Formulario inválido');
    }
  }

  onLimpiar() {
    this.registerForm.reset();
  }

  get claveNoCoincide(): boolean {
    const clave = this.registerForm.get('clave')?.value;
    const clave2 = this.registerForm.get('clave2')?.value;
    return clave !== clave2 && this.registerForm.get('clave2')?.touched === true;
  }

  // Validador personalizado para verificar que la edad sea mayor o igual a la mínima requerida
  validarEdadMinima(edadMinima: number) {
    return (control: any) => {
      if (!control.value) {
        return null; // Si no hay valor, no se valida
      }
  
      const fechaNacimiento = new Date(control.value);
      const hoy = new Date();
  
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  
      // Si el mes actual es menor al mes de nacimiento, o si es el mismo mes pero el día actual es menor al día de nacimiento, resta 1 a la edad
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
  
      // Verifica si la edad es menor a la edad mínima requerida
      return edad >= edadMinima ? null : { edadInvalida: true };
    };
  }
}