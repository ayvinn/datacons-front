import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
// import { MaterialModule } from './core/material.module';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from './template/template.component';
import { SeviceComponent,dialogajout } from './sevice/sevice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material' ;




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    TemplateComponent,
    SeviceComponent,
    dialogajout
    
    

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
    dialogajout
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SeviceComponent,dialogajout],
})
export class AppModule { }
