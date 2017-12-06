import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from '../games/game.service';
import {Game} from '../games/game.model';
import {Gamecharacter} from "../games/gamecharacter.model";
import {Character} from "../shared/character.model";


@Component({
  selector: 'app-detailed-games',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedGamesComponent implements OnInit {
  game: Game = new Game({title: 'loading', imagePath: ''});
  character: { name: string, imagePath: string};
  id: string;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.gameService.getGame(this.id).then(res => {
            this.game = res;
          });
        }
      );
  }

  onGameSelected(character: Character) {
    console.log('click2');
    this.character = character;
    console.log(character);

  }
}

