import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse',
  imports: [RouterLink],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent {
  styles = [
    { name: 'Casual', path: 'imgs/BROWSE/Casual.svg' },
    { name: 'Formal', path: 'imgs/BROWSE/Formal.svg' },
    { name: 'gym', path: 'imgs/BROWSE/gym.svg' },
    { name: 'Party', path: 'imgs/BROWSE/Party.svg' },
  ];
}
