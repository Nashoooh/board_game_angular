import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.scss',
  imports: [NavbarComponent, FooterComponent]
})
export class ReturnsComponent {

}
