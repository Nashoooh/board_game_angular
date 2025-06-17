import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PRODUCTOS } from '../../data/data_producto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  producto: any;
  relacionados: any[] = [];
  private sub: Subscription | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.producto = PRODUCTOS.find(p => String(p.id) === String(id));
      if (this.producto) {
        this.relacionados = PRODUCTOS.filter(p => p.categoria === this.producto.categoria && p.id !== this.producto.id);
        // Shuffle relacionados (Fisher-Yates)
        for (let i = this.relacionados.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.relacionados[i], this.relacionados[j]] = [this.relacionados[j], this.relacionados[i]];
        }
        this.relacionados = this.relacionados.slice(0, 4);
      } else {
        this.relacionados = [];
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  renderStars(puntuacion: number) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += `<span class='bi-star-fill${i < puntuacion ? '' : ' text-secondary'}'></span>`;
    }
    return `<span class='d-flex justify-content-center align-items-center small text-warning mb-2'>${stars}</span>`;
  }
}
