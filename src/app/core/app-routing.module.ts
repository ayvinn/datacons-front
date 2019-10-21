import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeviceComponent } from '../component/sevice/sevice.component';


const routes: Routes = [
  {
      path:"service",
      component:SeviceComponent,
      pathMatch :'full'

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
