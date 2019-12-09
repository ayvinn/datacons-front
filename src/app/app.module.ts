import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './component/auth/auth.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TemplateComponent } from './component/template/template.component';
import { SeviceComponent } from './component/service/sevice.component';
import { AddServiceComponent } from './component/service/add-service/add-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { UpdateServiceComponent } from './component/service/update-service/update-service.component';
import { CategorieComponent } from './component/categorie/categorie.component';
import { AddcategorieComponent } from './component/categorie/addcategorie/addcategorie.component';
import { UpdatecategorieComponent } from './component/categorie/updatecategorie/updatecategorie.component';
import { SecteurComponent } from './component/secteur/secteur.component';
import { AddsecteurComponent } from './component/secteur/addsecteur/addsecteur.component';
import { UpdatesecteurComponent } from './component/secteur/updatesecteur/updatesecteur.component';
import { DemandeurComponent } from './component/demandeur/demandeur.component';
import { AdddemandeurComponent } from './component/demandeur/adddemandeur/adddemandeur.component';
import { UpdatedemandeurComponent } from './component/demandeur/updatedemandeur/updatedemandeur.component';
import { EquipementComponent } from './component/equipement/equipement.component';
import { AddequipementComponent } from './component/equipement/addequipement/addequipement.component';
import { UpdateequipementComponent } from './component/equipement/updateequipement/updateequipement.component';
import { AddimageComponent } from './component/equipement/addequipement/addimage/addimage.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SousequipementComponent } from './component/equipement/addequipement/sousequipement/sousequipement.component';
import { AddlototoComponent } from './component/equipement/addequipement/lototo/addlototo/addlototo.component';
import { AddsousequipementComponent } from './component/equipement/addequipement/sousequipement/addsousequipement/addsousequipement.component';
import { UpdateimageComponent } from './component/equipement/updateequipement/updateimage/updateimage.component';
import { UpdatesousequipementComponent } from './component/equipement/updateequipement/updatesousequipement/updatesousequipement.component';
import { InterventionComponent } from './component/equipement/addequipement/intervention/intervention.component';
import { AddinterventionComponent } from './component/equipement/addequipement/intervention/addintervention/addintervention.component';
import { UpdatelototoComponent } from './component/equipement/updateequipement/updatelototo/updatelototo.component'
import { UpdateinterventionComponent } from './component/equipement/updateequipement/updateintervention/updateintervention.component';
import { TemplateDataConsingnationComponent } from './component/template-data-consingnation/template-data-consingnation.component';
import { ConsignationComponent } from './component/consignation/consignation.component';
import { AddConsignationComponent } from './component/consignation/add-consignation/add-consignation.component';
import { LoginComponent } from './component/consignation/add-consignation/login/login.component';
import { LototoComponent } from './component/equipement/addequipement/lototo/lototo.component'
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './component/notification/notification.component';
import { SelectEquipementComponent } from './component/consignation/add-consignation/select-equipement/select-equipement.component';
import { SousequipementConsignationComponent } from './component/consignation/add-consignation/sousequipement-consignation/sousequipement-consignation.component';
import { InterventionConsComponent } from './component/consignation/add-consignation/intervention/interventioncons.component';
import { AuthServiceGuard } from './guard/auth-service.guard';
import { AddSousequipementConsignationComponent } from './component/consignation/add-consignation/sousequipement-consignation/add-sousequipement-consignation/add-sousequipement-consignation.component'
import { ResponsablesComponent } from './component/consignation/add-consignation/responsables/responsables.component';
import { IntervenantsconsComponent } from './component/consignation/add-consignation/intervenantscons/intervenantscons.component';
import { AddintervenantsconsComponent } from './component/consignation/add-consignation/intervenantscons/addintervenantscons/addintervenantscons.component';
import { UpdateintervenantsconsComponent } from './component/consignation/add-consignation/intervenantscons/updateintervenantscons/updateintervenantscons.component';
import { SousequipementnotificationComponent } from './component/notification/sousequipementnotification/sousequipementnotification.component';
import { UpdatesousequipementnotificationComponent } from './component/notification/sousequipementnotification/updatesousequipementnotification/updatesousequipementnotification.component';
import { HistoriqueComponent } from './component/historique/historique.component';
import { EssaieComponent } from './component/consignation/essaie/essaie.component';
import { DeconsignationComponent } from './component/consignation/deconsignation/deconsignation.component';
import { ImprimerComponent } from './component/imprimer/imprimer.component';
import { PrintLayoutComponent } from './component/imprimer/print-layout/print-layout.component';
import { InvoiceComponent } from './component/imprimer/invoice/invoice.component';
import { PrintIntervenantsComponent } from './component/imprimer/print-intervenants/print-intervenants.component';
import { ImprimerInterventionComponent } from './component/imprimer/imprimer-intervention/imprimer-intervention.component';
import { ImprimerSousequipementComponent } from './component/imprimer/imprimer-sousequipement/imprimer-sousequipement.component';
import { ImprimerLotoComponent } from './component/imprimer/imprimer-loto/imprimer-loto.component';
import { SignatureComponent } from './component/imprimer/signature/signature.component';
import { PassationComponent } from './component/passation/passation.component';
import { Demandeur1Component } from './component/passation/demandeur1/demandeur1.component';
import { Demandeur2Component } from './component/passation/demandeur2/demandeur2.component';
import { ImprimerdeconsignationComponent } from './component/imprimerdeconsignation/imprimerdeconsignation.component';
import { Printlayout2Component } from './component/imprimerdeconsignation/printlayout2/printlayout2.component';
import { Invoice2Component } from './component/imprimerdeconsignation/invoice2/invoice2.component';
import { ConfirmprintComponent } from './component/consignation/deconsignation/confirmprint/confirmprint.component';
import { PrintelectricienComponent } from './component/imprimer/printelectricien/printelectricien.component';
import { PrintmecaniqueComponent } from './component/imprimer/printmecanique/printmecanique.component';
import { PrintpassationComponent } from './component/printpassation/printpassation.component';
import { Printlayout3Component } from './component/printpassation/printlayout3/printlayout3.component';
import { Invoice3Component } from './component/printpassation/invoice3/invoice3.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    TemplateComponent,
    SeviceComponent,
    AddServiceComponent,
    UpdateServiceComponent,
    CategorieComponent,
    AddcategorieComponent,
    UpdatecategorieComponent,
    SecteurComponent,
    AddsecteurComponent,
    UpdatesecteurComponent,
    DemandeurComponent,
    AdddemandeurComponent,
    UpdatedemandeurComponent,
    EquipementComponent,
    AddequipementComponent,
    UpdateequipementComponent,
    AddimageComponent,
    SousequipementComponent,
    AddlototoComponent,
    AddsousequipementComponent,
    UpdateimageComponent,
    UpdatesousequipementComponent,
    InterventionComponent,
    AddinterventionComponent,
    UpdatelototoComponent,
    UpdateinterventionComponent,
    TemplateDataConsingnationComponent,
    ConsignationComponent,
    AddConsignationComponent,
    LoginComponent,
    NotificationComponent,
    LototoComponent,
    SelectEquipementComponent,
    SousequipementConsignationComponent,
    InterventionConsComponent,
    AddSousequipementConsignationComponent,
    InterventionConsComponent,
    InterventionConsComponent,
    ResponsablesComponent,
    IntervenantsconsComponent,
    AddintervenantsconsComponent,
    SousequipementnotificationComponent,
    UpdatesousequipementnotificationComponent,
    UpdateintervenantsconsComponent,
    HistoriqueComponent,
    EssaieComponent,
    DeconsignationComponent,
    ImprimerComponent,
    PrintLayoutComponent,
    InvoiceComponent,
    PrintIntervenantsComponent,
    ImprimerInterventionComponent,
    ImprimerSousequipementComponent,
    ImprimerLotoComponent,
    SignatureComponent,
    PassationComponent,
    Demandeur1Component,

    Demandeur2Component,
    ImprimerdeconsignationComponent,
    Printlayout2Component,
    Invoice2Component,
    ConfirmprintComponent,
    PrintelectricienComponent,
    PrintmecaniqueComponent,
    PrintpassationComponent,
    Printlayout3Component,
    Invoice3Component
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([])
  ],
  exports: [
    AddServiceComponent, UpdateServiceComponent, AddcategorieComponent,
    UpdatecategorieComponent, SecteurComponent,
    AddsecteurComponent,
    UpdatesecteurComponent, DemandeurComponent,
    AdddemandeurComponent,
    UpdatedemandeurComponent, EquipementComponent,
    AddequipementComponent,
    UpdateequipementComponent, SousequipementComponent, AddlototoComponent, AddsousequipementComponent, AddinterventionComponent, InterventionComponent,
    AddinterventionComponent, UpdateinterventionComponent, LototoComponent, UpdatelototoComponent, SelectEquipementComponent,AddintervenantsconsComponent,ResponsablesComponent,AddintervenantsconsComponent,UpdateintervenantsconsComponent, UpdatesousequipementnotificationComponent,
    UpdateintervenantsconsComponent, EssaieComponent,
    DeconsignationComponent
  ],
  providers: [AuthServiceGuard],
  bootstrap: [AppComponent],
  entryComponents: [SeviceComponent, AddServiceComponent, UpdateServiceComponent, CategorieComponent, AddcategorieComponent,
    UpdatecategorieComponent, SecteurComponent,
    AddsecteurComponent, AuthComponent,ConfirmprintComponent,
    UpdatesecteurComponent, DemandeurComponent,
    AdddemandeurComponent,
    UpdatedemandeurComponent, EquipementComponent, AddSousequipementConsignationComponent,
    AddequipementComponent, AddinterventionComponent,UpdatesousequipementnotificationComponent,
    UpdateequipementComponent, SousequipementComponent, AddsousequipementComponent, AddlototoComponent, InterventionComponent, UpdatesousequipementComponent,

    AddinterventionComponent, UpdateinterventionComponent, LototoComponent, UpdatelototoComponent, SelectEquipementComponent,
    AddConsignationComponent,ResponsablesComponent,AddintervenantsconsComponent,UpdateintervenantsconsComponent, UpdatesousequipementnotificationComponent,
    UpdateintervenantsconsComponent, EssaieComponent,PassationComponent,
    DeconsignationComponent],

})
export class AppModule { }
