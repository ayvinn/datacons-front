import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeviceComponent } from '../component/service/sevice.component';
import { CategorieComponent } from '../component/categorie/categorie.component';
import { SecteurComponent } from '../component/secteur/secteur.component';
import { DemandeurComponent } from '../component/demandeur/demandeur.component';
import { EquipementComponent } from '../component/equipement/equipement.component';
import { AddequipementComponent } from '../component/equipement/addequipement/addequipement.component';
import { NotificationComponent } from '../component/notification/notification.component';


const routes: Routes = [
  {
    path: "service",
    component: SeviceComponent,
    //pathMatch: 'full'
    outlet: 'template'

  },
  {
    path: "categorie",
    component: CategorieComponent,
    //pathMatch: 'full'
    outlet: 'template'
  },
  {
    path: "secteur",
    component: SecteurComponent,
    // pathMatch: 'full'
    outlet: 'template'
  },
  {
    path: "demandeur",
    component: DemandeurComponent,
    // pathMatch: 'full'
    outlet: 'template'
  },
  {
    path: "equipement",
    component: EquipementComponent,
    // pathMatch: 'full'
    outlet: 'template'
  },
  {
    path: "ajouterequipement",
    component: AddequipementComponent,
    // pathMatch: 'full'
    outlet: 'template'
  },
  {
    path: "notifications",
    component: NotificationComponent,
    // pathMatch: 'full'
    outlet: 'template'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
