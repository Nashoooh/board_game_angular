import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    NavbarComponent
    // ContactComponent // Remove ContactComponent from declarations
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ContactComponent // Import ContactComponent here as it's standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }