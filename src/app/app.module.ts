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



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    TemplateComponent,
    SeviceComponent,
    AddServiceComponent,
    UpdateServiceComponent
    
    

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
    MaterialModule
    
  ],
  exports :[
    AddServiceComponent,UpdateServiceComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SeviceComponent,AddServiceComponent,UpdateServiceComponent],
})
export class AppModule { }
