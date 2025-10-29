import { NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isShown = signal(true);
  isOpened = signal(false);
  showSearch = signal(false);
  showLink = signal(false);
  displayNone() {
    this.isShown.set(false);
  }
  //maxi :)
  openMenu() {
    this.isOpened.update((current: any) => !current);
  }
  openSearch() {
    this.showSearch.set(!this.showSearch());
    console.log(this.showSearch());
  }
  openLinks() {
    this.showLink.update((current: any) => !current);
    console.log(this.showLink());
  }
}

//note1: img will hold the transtion
