import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Game} from './components/game/game';
import {ThemeSelector} from './components/theme-selector/theme-selector';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Game, ThemeSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng-higher-lower');
}
