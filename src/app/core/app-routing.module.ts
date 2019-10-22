import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeviceComponent } from '../component/sevice/sevice.component';
import { CategorieComponent } from '../component/categorie/categorie.component';


const routes: Routes = [
  {
      path:"service",
      component:SeviceComponent,
      pathMatch :'full'

  },
  {
    path:"categorie",
    component:CategorieComponent,
    pathMatch :'full'

},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
