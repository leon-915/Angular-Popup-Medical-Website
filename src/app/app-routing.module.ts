import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {  ProductComponent} from './components/index';




const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
