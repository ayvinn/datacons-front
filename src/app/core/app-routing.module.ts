import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeviceComponent } from '../component/sevice/sevice.component';
import { CategorieComponent } from '../component/categorie/categorie.component';
import { SecteurComponent } from '../component/secteur/secteur.component';
import { Demandeur } from '../models/demandeur.model';
import { DemandeurComponent } from '../component/demandeur/demandeur.component';


const routes: Routes = [
  {
      path:"service",
      component:SeviceComponent,
      pathMatch :'full'

  },
  {
    path:"categorie",
    component:CategorieComponent,
    pathMatch :'full'

},
{
  path:"secteur",
  component:SecteurComponent,
  pathMatch :'full'

},
{
  path:"demandeur",
  component:DemandeurComponent,
  pathMatch :'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
