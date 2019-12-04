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
import { AuthServiceGuard } from '../guard/auth-service.guard';
import { AddConsignationComponent } from '../component/consignation/add-consignation/add-consignation.component';
import { ConsignationComponent } from '../component/consignation/consignation.component';
import { PrintLayoutComponent } from '../component/imprimer/print-layout/print-layout.component';
import { InvoiceComponent } from '../component/imprimer/invoice/invoice.component';
import { Printlayout2Component } from '../component/imprimerdeconsignation/printlayout2/printlayout2.component';
import { Invoice2Component } from '../component/imprimerdeconsignation/invoice2/invoice2.component';


const routes: Routes = [
  { path: '', redirectTo: 'consignation', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: "consignation/login", component: AuthComponent },
  {
    path: 'consignation', component: TemplateDataConsingnationComponent,
    children: [
      { path: "", component: ConsignationComponent, outlet: 'templateConsignation' },
      { path: "dashboard", component: ConsignationComponent, outlet: 'templateConsignation' },
      { path: "addconsignation", component: AddConsignationComponent, outlet: 'templateConsignation' },
      { path: "statistiaque", component: AddConsignationComponent, outlet: 'templateConsignation' },
    ]
  },
  {
    path: 'admin', component: TemplateComponent, canActivate: [AuthServiceGuard], pathMatch: 'prefix',
    children: [
      { path: "", component: DemandeurComponent, outlet: 'template' },
      { path: "categorie", component: CategorieComponent, outlet: 'template' },
      { path: "secteur", component: SecteurComponent, outlet: 'template' },
      { path: "demandeur", component: DemandeurComponent, outlet: 'template' },
      { path: "service", component: SeviceComponent, outlet: 'template' },
      { path: "equipement", component: EquipementComponent, outlet: 'template' },
      { path: "ajouterequipement", component: AddequipementComponent, outlet: 'template' },
      { path: "notifications", component: NotificationComponent, outlet: 'template' },
    ]
  },
  { path: "ajouterequipement", component: AddequipementComponent, outlet: 'template' },

  { path: '**', redirectTo: 'consignation', pathMatch: 'full' },
  { path: 'print', outlet: 'print', component: PrintLayoutComponent,
    children: [
      { path: 'invoice', component: InvoiceComponent }
    ]
  },
  { path: 'print2', outlet: 'print2', component: Printlayout2Component,
  children: [
    { path: 'invoice2', component: Invoice2Component }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
