import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { ReturnsComponent } from './components/returns/returns.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [ 
    { path: '', component: IndexComponent }, // Ruta raíz
    { path: 'register', component: RegisterComponent},
    { path:'returns', component: ReturnsComponent},
    { path:'about', component: AboutComponent},
    { path:'contact', component: ContactComponent},
    { path:'shipping', component: ShippingComponent},
    { path:'product-list', component: ProductListComponent},
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirección para rutas no encontradas
];
