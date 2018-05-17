import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//ajout pour ngbootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import {NgForm, FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
//on l'a ajouté la ligne ci dessous suite a la commande "ng generate component header"
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    //on l'a ajouté la ligne ci dessous suite a la commande "ng generate component header"
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
