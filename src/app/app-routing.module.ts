import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './shows/show-list/show-list.component';
import { ShowComponent } from './shows/show-detail/show.component';


const routes: Routes = [
  {path: 'shows', component: ShowListComponent},
  {path: 'show/:id', component: ShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
