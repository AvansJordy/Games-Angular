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
        .then(recipes => {
          this.gameService.gamesChanged.next(recipes.slice());
        });
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.gameForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.gameForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editgame = new Game({name: '', imagepath: '', description: ''});

    const GameIngredients = new FormArray([]);

    if (this.editMode) {
      this.gameService.getGame(this.id)
        .then(game => {
          editgame = game;
          if (game['ingredients']) {
            for (const ingredient of game.ingredients) {
              GameIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required)
                })
              );
            }
          }
          this.gameForm = new FormGroup({
            'title': new FormControl(editgame.title, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'description': new FormControl(editgame.description, Validators.required),
            'characters': GameIngredients,
            'imagePath': new FormControl(editgame.imagePath, Validators.required),
            'platforms': GameIngredients,
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
