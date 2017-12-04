//
// Domain class
//

import {Ingredient} from '../shared/ingredient.model';
export class Game {

  private id: string;
  private _title: string;
  private _genre: string;
  private _description: string;
  private _characters: Ingredient[];
  private _imagePath: string;
  private _platforms: Ingredient[];
  private _developer: string;
  private _publisher: string;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get title(): string {
    return this._title;
  }

  public set title(t: string) {
    this._title = t;
  }

  public get genre(): string {
    return this._genre;
  }

  public set genre(g: string) {
    this._genre = g;
  }

  public get description(): string {
    return this._description;
  }

  public set description(d: string) {
    this._description = d;
  }

  public get characters(): Ingredient[] {
    return this._characters;
  }

  public set characters(c: Ingredient[]) {
    this._characters = c;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(i: string) {
    this._imagePath = i;
  }

  public get platforms(): Ingredient[] {
    return this._platforms;
  }

  public set platforms(p: Ingredient[]) {
    this._platforms = p;
  }

  public get developer(): string {
  return this._developer;
}

  public set developer(d: string) {
    this._developer = d;
  }

  public get publisher(): string {
    return this._publisher;
  }

  public set publisher(p: string) {
    this._publisher = p;
  }



}
