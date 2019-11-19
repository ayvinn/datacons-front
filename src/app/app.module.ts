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
import { CommonModule } from '@angular/common';
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
    AddintervenantsconsComponent


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
    BrowserAnimationsModule
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
    AddinterventionComponent, UpdateinterventionComponent, LototoComponent, UpdatelototoComponent, SelectEquipementComponent,AddintervenantsconsComponent,ResponsablesComponent,AddintervenantsconsComponent
  ],
  providers: [AuthServiceGuard],
  bootstrap: [AppComponent],
  entryComponents: [SeviceComponent, AddServiceComponent, UpdateServiceComponent, CategorieComponent, AddcategorieComponent,
    UpdatecategorieComponent, SecteurComponent,
    AddsecteurComponent, AuthComponent,
    UpdatesecteurComponent, DemandeurComponent,
    AdddemandeurComponent,
    UpdatedemandeurComponent, EquipementComponent, AddSousequipementConsignationComponent,
    AddequipementComponent, AddinterventionComponent,
    UpdateequipementComponent, SousequipementComponent, AddsousequipementComponent, AddlototoComponent, InterventionComponent, UpdatesousequipementComponent,

    AddinterventionComponent, UpdateinterventionComponent, LototoComponent, UpdatelototoComponent, SelectEquipementComponent,
    AddConsignationComponent,ResponsablesComponent,AddintervenantsconsComponent],

})
export class AppModule { }
