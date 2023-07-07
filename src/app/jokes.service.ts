import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeInterface } from './joke-interface';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  constructor(private http: HttpClient) {}

  getRandomJoke(): Observable<JokeInterface> {
    return this.http
      .get<JokeInterface>('https://official-joke-api.appspot.com/jokes/random')
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
