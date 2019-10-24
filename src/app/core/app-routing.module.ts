import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeviceComponent } from '../component/sevice/sevice.component';
import { CategorieComponent } from '../component/categorie/categorie.component';
import { SecteurComponent } from '../component/secteur/secteur.component';
import { Demandeur } from '../models/demandeur.model';
import { DemandeurComponent } from '../component/demandeur/demandeur.component';
import { EquipementComponent } from '../component/equipement/equipement.component';
import { StepperComponent } from '../component/equipement/stepper/stepper.component';


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
{
  path:"equipement",
  component:EquipementComponent,
  pathMatch :'full'
},
{
  path:"ajouter-equipement",
  component:StepperComponent,
  pathMatch :'full'
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
