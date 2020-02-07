import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { SideMenuComponent } from './shared/layouts/side-menu/side-menu.component';
import { FormsModule } from '@angular/forms';
import { ShowListComponent } from './shows/show-list/show-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowComponent } from './shows/show-detail/show.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TmdbApiService } from './core/services/tmdb-api.service';
import { ShowListItemComponent } from './shows/show-list-item/show-list-item.component';
import { RatingPipe } from './core/pipes/rating.pipe';
import { PluralPipe } from './core/pipes/plural.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    ShowListComponent,
    ShowComponent,
    ShowListItemComponent,
    RatingPipe,
    PluralPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    TmdbApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
