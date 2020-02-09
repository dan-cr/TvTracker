import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './shows/show-list/show-list.component';
import { ShowComponent } from './shows/show-detail/show.component';
import { ShowSeasonComponent } from './shows/show-season/show-season.component';


const routes: Routes = [
  {path: 'shows', component: ShowListComponent},
  {path: 'search/shows/:term', component: ShowListComponent},
  {path: 'show/:id', component: ShowComponent},
  {path: 'show/:id/season/:seasonNo', component: ShowSeasonComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
