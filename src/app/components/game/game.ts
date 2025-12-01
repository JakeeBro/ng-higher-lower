import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-game',
  imports: [
    FormsModule
  ],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {

  gameOver: boolean = false;

  settingsApplied: boolean = false;
  settingsFeedback: string = '';

  minValue: number | null = 0;
  maxValue: number | null = 100;
  rangeFeedback: string = '';
  validRange: boolean = false;

  limit: number | null = null;
  bypassLimit!: boolean;
  limitFeedback: string = '';
  validLimit: boolean = false;

  answer!: number;

  guess: number | null = null;
  guessList: number[] = [];
  guessFeedback: string = '';

  endFeedback: string = '';

  ngOnInit() {
    this.resetGame();
  }

  resetGame(): void {
    this.gameOver = false;

    this.bypassLimit = true;
    this.limit = null;

    this.settingsApplied = false;

    this.minValue = null;
    this.maxValue = null;

    this.guessList = [];
    this.guessFeedback = '';

    this.endFeedback = '';
  }

  validateRange(value: number | null, name: string): boolean {
    if (!Number.isNaN(value)) {
      return true;
    } else {
      this.rangeFeedback = `${name} is invalid`;
      return false;
    }
  }

  setRange() {
    if (!this.validateRange(this.minValue, 'Min') || !this.validateRange(this.maxValue, 'Max')) {
      return;
    }

    if (this.minValue == null) { this.minValue = 0; }

    if (this.maxValue == null) { this.maxValue = 100; }

    if (this.minValue > this.maxValue) {
      this.rangeFeedback = 'Min Value cannot be higher than Max Value';
      this.validRange = false;
      return;
    }

    this.rangeFeedback = '';
    this.validRange = true;

    // Generate and Assign the Answer
    let range = this.maxValue - this.minValue;
    let offset = 0 - this.minValue;
    this.answer = Math.floor(Math.random() * range) + 1 - offset;
    console.log('Answer: ' + this.answer);
  }

  setLimit() {
    if (this.limit != null && this.limit < 0) {
      this.bypassLimit = true;
      this.limitFeedback = 'Limit cannot be negative';
      this.validLimit = false;
      return;
    }

    if (this.limit == null || this.limit == 0) {
      this.bypassLimit = true;
      this.validLimit = true;
      return;
    }

    console.log('Limit: ' + this.limit);
    this.bypassLimit = false;
    this.validLimit = true;
  }

  applySettings() {

    // Run Set Range just in case the user never clicked the SetRange button
    this.setRange()
    this.setLimit();

    if (!this.verifySettings()) {
      this.settingsFeedback = 'Invalid Settings';
      return;
    }

    this.settingsFeedback = '';
    this.settingsApplied = true;

    console.log('Settings Applied');
  }

  verifySettings(): boolean {
    return this.validRange && this.validLimit;
  }

  submitGuess(guessInput: HTMLInputElement, guessButton: HTMLButtonElement) {

    if (this.guess == null) {
      this.guessFeedback = 'Please enter a Guess';
      return;
    }

    this.guessList.push(this.guess);

    if (this.guess == this.answer) {
      this.guessFeedback = `${this.guess} is correct!`;

      guessInput.disabled = true;
      guessButton.disabled = true;

      this.endGame(true);
    } else if (this.guess > this.answer) {
      this.guessFeedback = `${this.guess} is too high!`;
    } else if (this.guess < this.answer) {
      this.guessFeedback = `${this.guess} is too low!`;
    }

    // Calculate Limit
    if (this.limit != null) {
      this.limit = this.limit - 1;

      if (this.limit <= 0) {
        this.endGame(false);
      }
    }

    this.guess = null;
  }

  endGame(won: boolean) {
    this.endFeedback = won ? 'Good Guess!' : 'Try Again :(';

    this.gameOver = true;
  }
}
