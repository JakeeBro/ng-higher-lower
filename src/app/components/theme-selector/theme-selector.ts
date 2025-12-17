import { Component, EventEmitter, Output } from '@angular/core';
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-theme-selector',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.css',
})
export class ThemeSelector {
  // Array of all Defined Themes
  themes: string[] = [
    'theme-rose',
    'theme-marigold',
    'theme-sunflower',
    'theme-aloe',
    'theme-orchid',
    'theme-iris',
  ]

  menuOpen: boolean = false;

  @Output() menuStateChange = new EventEmitter<boolean>();

  ngOnInit() {

    // Reload the Saved Theme if it exists
    const savedTheme = localStorage.getItem('theme') ?? 'theme-orchid';
    if (savedTheme) this.setTheme(savedTheme);
  }

  setTheme(newTheme: string) {
    this.themes.forEach(theme => {
      document.documentElement.classList.remove(theme)
    })

    document.documentElement.classList.add(newTheme);

    // Save Theme
    localStorage.setItem('theme', newTheme);

    // this.menuOpen = false;
    // this.menuStateChange.emit(this.menuOpen);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.menuStateChange.emit(this.menuOpen);
  }
}
