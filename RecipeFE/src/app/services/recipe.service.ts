import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private configUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = 'c6a7e1fc857b8d1430df7987e96632aa';
  private app_id = '08b8ee39';

  private httpOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };

  constructor(private http: HttpClient) {}

  getRecipes(searchterm: string): Observable<any> {
    let quisineType = 'Middle Eastern'; //could be sent as parameter
    let mealType = 'Lunch'; //could be sent as parameter
    let url =
      this.configUrl +
      '&q=' +
      searchterm +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key +
      '&cuisineType=' +
      quisineType +
      '&mealType=' +
      mealType;
    return this.http.get<any>(url, this.httpOptions);
  }
}

// curl -X 'GET' \
//   'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=08b8ee39&app_key=c6a7e1fc857b8d1430df7987e96632aa&cuisineType=Middle%20Eastern&mealType=Lunch' \
//   -H 'accept: application/json' \
//   -H 'Accept-Language: en'
