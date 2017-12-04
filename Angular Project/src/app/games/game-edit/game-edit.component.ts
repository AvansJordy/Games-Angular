import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { GameService } from '../game.service';
import {Game} from '../game.model';


@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  id: string;
  editMode = false;
  gameForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.gameService.updateGame(this.id, this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
      this.gameService.getGames()
        .then(games => {
          this.gameService.gamesChanged.next(games.slice());
        });
    }
    this.onCancel();
  }

  onAddPlatform() {
    (<FormArray>this.gameForm.get('platforms')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeletePlatform(index: number) {
    (<FormArray>this.gameForm.get('platforms')).removeAt(index);
  }

  onAddCharacter() {
    (<FormArray>this.gameForm.get('characters')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteCharacter(index: number) {
    (<FormArray>this.gameForm.get('characters')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editgame = new Game({name: '', imagepath: '', description: ''});

    const GamePlatforms = new FormArray([]);
    const GameCharacters = new FormArray([]);

    if (this.editMode) {
      this.gameService.getGame(this.id)
        .then(game => {
          editgame = game;
          if (game['platforms']) {
            for (const platform of game.platforms) {
              GamePlatforms.push(
                new FormGroup({
                  'name': new FormControl(platform.name, Validators.required)
                })
              );

            }
          }
          if (game['characters']) {
            for (const character of game.characters) {
              GameCharacters.push(
                new FormGroup({
                  'name': new FormControl(character.name, Validators.required)
                })
              );

            }
          }
          this.gameForm = new FormGroup({
            'title': new FormControl(editgame.title, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'description': new FormControl(editgame.description, Validators.required),
            'characters': GamePlatforms,
            'imagePath': new FormControl(editgame.imagePath, Validators.required),
            'platforms': GameCharacters,
            'developer': new FormControl(editgame.developer, Validators.required),
            'publisher': new FormControl(editgame.publisher, Validators.required),
          });
        })
        .catch(error => console.log(error));
    }

    this.gameForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'genre': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'characters': new FormArray([]),
      'imagePath': new FormControl('', Validators.required),
      'platforms': new FormArray([]),
      'developer': new FormControl('', Validators.required),
      'publisher': new FormControl('', Validators.required),
    });
  }

}
