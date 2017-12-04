import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';

import {Game} from './game.model';


@Injectable()
export class GameService {
  gamesChanged = new Subject<Game[]>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/games/'; // URL to web api
  private games: Game[];

  constructor(private http: Http) {
  }

  getGames() {
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.games = response.json().game as Game[];
        return response.json().game as Game[];
      })
      .catch(error => {
        return error;
      });
  }

  getGame(index: string) {
    if (index == null)
      return null;
    return this.http.get(this.serverUrl + index, {headers: this.headers})
      .toPromise()

      .then(response => {
        return response.json().game[0];
      })
      .catch(error => {

        return error;
      });
  }

  addGame(game: Game) {
    return this.http.post(this.serverUrl, game, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.gamesChanged.next(this.games.slice());
      });
  }

  updateGame(index: string, newGame: Game) {
    return this.http.put(this.serverUrl + index, newGame, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.gamesChanged.next(this.games.slice());
      });
  }

  deleteGame(index: string) {
    return this.http.delete(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.gamesChanged.next(this.games.slice());
      });
  }
}
