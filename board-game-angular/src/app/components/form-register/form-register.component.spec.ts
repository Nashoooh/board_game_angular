import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule si el formulario usa reactive forms
import { FormRegisterComponent } from './form-register.component';

describe('FormRegisterComponent', () => {
  let component: FormRegisterComponent;
  let fixture: ComponentFixture<FormRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormRegisterComponent] // Asegúrate de importar ReactiveFormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.registerForm.valid).toBeFalsy(); // Verifica que el formulario sea inválido cuando está vacío
  });

  it('should validate the "nombre" field as required', () => {
    const nombreControl = component.registerForm.get('nombre'); // Obtén el control del campo "nombre"
    nombreControl?.setValue(''); // Deja el campo vacío
    expect(nombreControl?.valid).toBeFalsy(); // Verifica que sea inválido
    expect(nombreControl?.errors?.['required']).toBeTruthy(); // Verifica que tenga el error 'required'

    nombreControl?.setValue('Juan Pérez'); // Ingresa un valor válido
    expect(nombreControl?.valid).toBeTruthy(); // Verifica que sea válido
  });

  it('should validate the "correo" field with email format', () => {
    const correoControl = component.registerForm.get('correo'); // Obtén el control del campo "correo"
    correoControl?.setValue(''); // Deja el campo vacío
    expect(correoControl?.valid).toBeFalsy(); // Verifica que sea inválido
    expect(correoControl?.errors?.['required']).toBeTruthy(); // Verifica que tenga el error 'required'

    correoControl?.setValue('invalid-email'); // Ingresa un email inválido
    expect(correoControl?.valid).toBeFalsy(); // Verifica que sea inválido
    expect(correoControl?.errors?.['email']).toBeTruthy(); // Verifica que tenga el error 'email'

    correoControl?.setValue('test@example.com'); // Ingresa un email válido
    expect(correoControl?.valid).toBeTruthy(); // Verifica que sea válido
  });

  it('should reset the form when "onLimpiar" is called', () => {
    component.registerForm.setValue({
      nombre: 'Juan Pérez',
      usuario: 'juanperez',
      correo: 'test@example.com',
      clave: 'Password123',
      clave2: 'Password123',
      nacimiento: '2000-01-01',
      direccion: 'Calle Falsa 123'
    }); // Llena el formulario con valores válidos

    component.onLimpiar(); // Llama al método "onLimpiar"
    expect(component.registerForm.pristine).toBeTruthy(); // Verifica que el formulario esté en estado "pristine"
    expect(component.registerForm.value).toEqual({
      nombre: null,
      usuario: null,
      correo: null,
      clave: null,
      clave2: null,
      nacimiento: null,
      direccion: null
    }); // Verifica que todos los campos estén vacíos
  });
});