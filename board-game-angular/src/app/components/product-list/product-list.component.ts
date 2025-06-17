import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PRODUCTOS } from '../../data/data_producto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule]
})
export class ProductListComponent implements OnInit, OnDestroy {
  productos = PRODUCTOS;
  productosFiltrados = PRODUCTOS;
  categorias = [
    { nombre: 'Todos', valor: 'todos' },
    { nombre: 'Estrategia', valor: 'estrategia' },
    { nombre: 'Familiares', valor: 'familiares' },
    { nombre: 'Infantiles', valor: 'infantiles' },
    { nombre: 'Pareja', valor: 'pareja' },
    { nombre: 'Party Game', valor: 'party' }
  ];
  categoriaSeleccionada = 'todos';
  PRODUCTOS_POR_PAGINA = 8;
  paginaActual = 1;
  private subs: Subscription[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Solo escuchar cambios en queryParams
    this.subs.push(this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'] || 'todos';
      this.seleccionarCategoria(categoria);
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  get totalPaginas() {
    return Math.ceil(this.productosFiltrados.length / this.PRODUCTOS_POR_PAGINA);
  }

  get productosPagina() {
    const inicio = (this.paginaActual - 1) * this.PRODUCTOS_POR_PAGINA;
    return this.productosFiltrados.slice(inicio, inicio + this.PRODUCTOS_POR_PAGINA);
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    if (categoria === 'todos') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(p => p.categoria === categoria);
    }
    this.paginaActual = 1;
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    // Forzar actualización de productosPagina
    this.productosFiltrados = [...this.productosFiltrados];
  }

  renderStars(puntuacion: number) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += `<span class='bi-star-fill${i < puntuacion ? '' : ' text-secondary'}'></span>`;
    }
    return `<span class='d-flex justify-content-center align-items-center small text-warning mb-2'>${stars}</span>`;
  }
}
