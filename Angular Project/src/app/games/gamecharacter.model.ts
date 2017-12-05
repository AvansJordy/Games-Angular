import {Character} from '../character/character.model';
export class Gamecharacter {
  private id: string;
  private _name: string;
  private _imagepath: string;
  private _details: Character

  public get _id() {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get details() {
    return this._details;
  }

  public set details(n: Character) {
    this._details = n;
  }

  public get name() {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }


  public get imagePath() {
    return this._imagepath;
  }

  public set imagePath(n: string) {
    this._imagepath = n;
  }
}
