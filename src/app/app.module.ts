import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
// import { MaterialModule } from './core/material.module';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './component/auth/auth.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TemplateComponent } from './component/template/template.component';
import { SeviceComponent } from './component/sevice/sevice.component';
import { AddServiceComponent } from './component/sevice/add-service/add-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material' ;
import { UpdateServiceComponent } from './component/sevice/update-service/update-service.component';
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
import { StepperComponent } from './component/equipement/stepper/stepper.component';
import { AddimageComponent } from './component/equipement/addequipement/addimage/addimage.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


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
    StepperComponent,
    AddimageComponent
    
    

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
    MaterialModule,NgxDropzoneModule
    
  ],
  exports :[
    AddServiceComponent,UpdateServiceComponent,AddcategorieComponent,
    UpdatecategorieComponent,SecteurComponent,
    AddsecteurComponent,
    UpdatesecteurComponent,DemandeurComponent,
    AdddemandeurComponent,
    UpdatedemandeurComponent, EquipementComponent,
    AddequipementComponent,
    UpdateequipementComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SeviceComponent,AddServiceComponent,UpdateServiceComponent,CategorieComponent,AddcategorieComponent,
    UpdatecategorieComponent,SecteurComponent,
    AddsecteurComponent,
    UpdatesecteurComponent,DemandeurComponent,
    AdddemandeurComponent,
    UpdatedemandeurComponent, EquipementComponent,
    AddequipementComponent,
    UpdateequipementComponent],
})
export class AppModule { }
