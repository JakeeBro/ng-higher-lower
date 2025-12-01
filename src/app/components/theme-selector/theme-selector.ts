import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.css',
})
export class ThemeSelector {
  // Array of all Defined Themes
  themes: string[] = [
    'theme-light',
    'theme-dark',
    'theme-ocean',
    'theme-rose'
  ]

  ngOnInit() {

    // Reload the Saved Theme if it exists
    const savedTheme = localStorage.getItem('theme') ?? '';
    this.setTheme(savedTheme);
  }

  setTheme(newTheme: string) {
    this.themes.forEach(theme => {
      document.documentElement.classList.remove(theme)
    })

    document.documentElement.classList.add(newTheme);

    // Save Theme
    localStorage.setItem('theme', newTheme);
  }
}
