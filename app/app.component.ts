import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'keg-list',
  inputs: ['kegList'],
  outputs: ['onKegSelect'],
  template: `
  <h3 *ngFor="#currentKeg of kegList"
  (click)="kegClicked(currentKeg)"
  [class.selected]="currentKeg === selectedKeg">
    {{ currentKeg.brewer }}
  </h3>
  `
})
export class KegListComponent {
  public kegList: Keg[];
  public onKegSelect: EventEmitter<Keg>;
  public selectedKeg: Keg;
  constructor() {
    this.onKegSelect = new EventEmitter();
  }
  kegClicked(clickedKeg: Keg): void {
    console.log('child', clickedKeg);
    this.selectedKeg = clickedKeg;
    this.onKegSelect.emit(clickedKeg);
  }
}


@Component({
  selector: 'my-app',
  directives: [KegListComponent],
  template: `
    <div class="container">
      <h1>To-Do List</h1>
      <keg-list
        [kegList]="kegs"
        (onKegSelect)="kegWasSelected($event)">
      </keg-list>
    </div>
  `
})
export class AppComponent {
  public kegs: Keg[];
  constructor(){
    this.kegs = [
      new Keg("Old Latrobe", "Rolling Rock", "Extra Pale Ale", 0),
      new Keg("Ninkasi", "Tricerehops", "IPA", 1),
      new Keg("Double Mountain", "Vaporizer", "Amber Ale", 2)
    ];
  }
  kegWasSelected(clickedKeg: Keg): void {
    console.log('parent', clickedKeg);
  }
}

export class Keg {
  public full: boolean = false;
  constructor(public brewer: string, public beerName: string, public beerType: string, public id: number) {

  }
}
