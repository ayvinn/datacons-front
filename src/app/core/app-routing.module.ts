import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeviceComponent } from '../component/service/sevice.component';
import { CategorieComponent } from '../component/categorie/categorie.component';
import { SecteurComponent } from '../component/secteur/secteur.component';
import { DemandeurComponent } from '../component/demandeur/demandeur.component';
import { EquipementComponent } from '../component/equipement/equipement.component';
import { AddequipementComponent } from '../component/equipement/addequipement/addequipement.component';
import { NotificationComponent } from '../component/notification/notification.component';
import { AuthComponent } from '../component/auth/auth.component';
import { TemplateDataConsingnationComponent } from '../component/template-data-consingnation/template-data-consingnation.component';
import { TemplateComponent } from '../component/template/template.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { AuthServiceGuard } from '../guard/auth-service.guard';
import { AddConsignationComponent } from '../component/consignation/add-consignation/add-consignation.component';


const routes: Routes = [
  { path: '', redirectTo: 'consignation', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: "consignation/login", component: AuthComponent },
  /* 
  { path: 'consignation', component: DashboardComponent },
  { path: 'addconsignation', component: TemplateDataConsingnationComponent },
  */
  {
    path: 'consignation', component: TemplateDataConsingnationComponent,
    children: [
      { path: "", component: DashboardComponent, outlet: 'templateConsignation' },
      { path: "dashboard", component: DashboardComponent, outlet: 'templateConsignation' },
      { path: "addconsignation", component: AddConsignationComponent, outlet: 'templateConsignation' },
      { path: "statistiaque", component: AddConsignationComponent, outlet: 'templateConsignation' },
    ]
  },
  {
    path: 'admin', component: TemplateComponent, canActivate: [AuthServiceGuard],
    children: [
      { path: "", component: DemandeurComponent, outlet: 'template' },
      { path: "categorie", component: CategorieComponent, outlet: 'template' },
      { path: "secteur", component: SecteurComponent, outlet: 'template' },
      { path: "demandeur", component: DemandeurComponent, outlet: 'template' },
      { path: "equipement", component: EquipementComponent, outlet: 'template' },
      { path: "ajouterequipement", component: AddequipementComponent, outlet: 'template' },
      { path: "notifications", component: NotificationComponent, outlet: 'template' },
    ]
  },
  { path: '**', redirectTo: 'consignation', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
