import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Game} from './components/game/game';
import {ThemeSelector} from './components/theme-selector/theme-selector';
import {Panel} from "./components/panel/panel";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Game, ThemeSelector, Panel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng-higher-lower');
}
