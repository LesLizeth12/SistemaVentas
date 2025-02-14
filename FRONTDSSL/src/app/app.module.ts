import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionregistroComponent } from './components/gestionregistro/gestionregistro.component';

import { HttpClientModule } from '@angular/common/http';
import { ClienteFormComponent } from './components/gestionregistro/cliente-form/cliente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestioncategoriaComponent } from './components/gestioncategoria/gestioncategoria.component';
import { CategoriaFormComponent } from './components/gestioncategoria/categoria-form/categoria-form.component';
import { GestionventasComponent } from './components/gestionventas/gestionventas.component';
import { LoginComponent } from './components/login/login.component';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { IndexComponent } from './components/index/index.component';
import { UsuarioFormComponent } from './components/gestionusuario/usuario-form/usuario-form.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { TipoUsuarioFormComponent } from './components/tipo-usuario/tipo-usuario-form/tipo-usuario-form.component';
import { GestioninventarioComponent } from './components/gestioninventario/gestioninventario.component';
import { ProductoFormComponent } from './components/gestioninventario/producto-form/producto-form.component';
import { GestionreporteComponent } from './components/gestionreporte/gestionreporte.component';


// import { Categoria } from './models/CategoriaModel';

@NgModule({
  declarations: [
    AppComponent,
    GestionregistroComponent,
    ClienteFormComponent,
    GestioncategoriaComponent,
    CategoriaFormComponent,
    GestionventasComponent,
    LoginComponent,
    GestionusuarioComponent,

    IndexComponent,
      UsuarioFormComponent,
      TipoUsuarioComponent,
      TipoUsuarioFormComponent,
      GestioninventarioComponent,
      ProductoFormComponent,
      GestionreporteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
