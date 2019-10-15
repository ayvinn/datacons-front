import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/material.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
