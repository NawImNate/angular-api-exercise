import { JokeInterface } from '../joke-interface';
import { JokesService } from './../jokes.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
})
export class SetupComponent {
  constructor() {}
  isLoading: boolean;
  JokesService: JokesService = inject(JokesService);

  displayPunchline: boolean = false;

  onPress() {
    this.displayPunchline = !this.displayPunchline;
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  joke: JokeInterface;

  ngOnInit() {
    console.log('here');
    this.isLoading = true;
    this.JokesService.getRandomJoke().subscribe((data: JokeInterface) => {
      this.joke = data;
      // delay for loading
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    });
  }
}
