import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionregistroComponent } from "./components/gestionregistro/gestionregistro.component";
import { GestionventasComponent } from './components/gestionventas/gestionventas.component';

import { GestioncategoriaComponent } from "./components/gestioncategoria/gestioncategoria.component"
import { LoginComponent } from './components/login/login.component';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { IndexComponent } from './components/index/index.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { GestioninventarioComponent } from './components/gestioninventario/gestioninventario.component';
import { GestionreporteComponent } from './components/gestionreporte/gestionreporte.component';

const routes: Routes = [
    {path:'gestionregistro',component:GestionregistroComponent},
    {path:'gestioncategoria', component: GestioncategoriaComponent },
    {path:'gestionventas',component:GestionventasComponent}, //NOMBRE A LLAMAR EN LA URL
    {path:'gestionusuario',component:GestionusuarioComponent},
    {path:'gestioninventario',component:GestioninventarioComponent},
    {path:'gestionreporte',component:GestionreporteComponent},
    {path:'login',component:LoginComponent},
    {path:'index',component:IndexComponent},
    {path:'tipo_usuario',component:TipoUsuarioComponent},
    {path:'',redirectTo:'/index',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
