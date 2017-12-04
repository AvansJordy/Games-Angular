import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// import { Game } from '../game.model';
// import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list-detail',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class DetailGameComponent implements OnInit, OnDestroy {
  // games: Game[];
  // subscription: Subscription;

  constructor(
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.subscription = this.gameService.gamesChanged
    //   .subscribe(
    //     (games: Game[]) => {
    //       this.gameService.getGames()
    //         .then(res => {
    //           this.games = res;
    //         });
    //     }
    //   );
    // this.gameService.getGames().then(res => {
    //   this.games = res;
    // });
  }
  //
  // onNewGame() {
  //   this.router.navigate(['new'], {relativeTo: this.route});
  // }
  //
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
