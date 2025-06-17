import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PRODUCTOS } from '../../data/data_producto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent]
})
export class IndexComponent {
  productos = PRODUCTOS.filter(p => p.destacado);
  itemsPorSlide = 3;
  grupos: any[][] = [];

  constructor() {
    this.generarGrupos();
  }

  generarGrupos() {
    const destacados = this.productos;
    const grupos: any[][] = [];
    if (destacados.length === 0) return;
    for (let i = 0; i < destacados.length; i++) {
      let grupo = [];
      for (let j = 0; j < this.itemsPorSlide; j++) {
        grupo.push(destacados[(i + j) % destacados.length]);
      }
      grupos.push(grupo);
    }
    this.grupos = grupos;
  }
}
