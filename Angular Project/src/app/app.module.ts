import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';

import {Game} from "./games/game.model";
import {GamesComponent} from "./games/games.component";
import {GameDetailComponent} from "./games/game-detail/game-detail.component";
import {GameItemComponent} from "./games/game-list/game-item/game-item.component";
import {GameStartComponent} from "./games/game-start/game-start.component";
import {GameEditComponent} from "./games/game-edit/game-edit.component";
import {GameListComponent} from "./games/game-list/game-list.component";
import {GameService} from "./games/game.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    GamesComponent,
    GameListComponent,
    GameDetailComponent,
    GameItemComponent,
    GameStartComponent,
    GameEditComponent,

    DropdownDirective




  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
