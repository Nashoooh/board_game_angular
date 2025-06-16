import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

export const routes: Routes = [ 
    { path: '', component: IndexComponent }, // Ruta raíz
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirección para rutas no encontradas
];
