import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormRegisterComponent } from '../form-register/form-register.component';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [NavbarComponent, FooterComponent, FormRegisterComponent],
})
export class RegisterComponent {}