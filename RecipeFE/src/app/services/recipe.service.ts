import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../interfaces/filter';

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

  // getRecipes(
  //   searchterm = 'Chicken',
  //   cuisineType = 'Middle Eastern',
  //   mealType = 'Dinner'
  // ): Observable<any> {
  //   let url =
  //     this.configUrl +
  //     '&q=' +
  //     searchterm +
  //     '&app_id=' +
  //     this.app_id +
  //     '&app_key=' +
  //     this.app_key +
  //     '&cuisineType=' +
  //     cuisineType +
  //     '&mealType=' +
  //     mealType;
  //   return this.http.get<any>(url, this.httpOptions);
  // }

  getRecipes(filter: Filter): Observable<any> {
    let url = `${this.configUrl}&app_id=${this.app_id}&app_key=${this.app_key}`;
    if (filter.query) {
      url += `&q=${filter.query}`;
    }
    if (filter.health) {
      url += `&health=${filter.health}`;
    }
    if (filter.cuisineTypes) {
      url += `&cuisine_type=${filter.cuisineTypes}`;
    }
    if (filter.mealTypes) {
      url += `&meal_type=${filter.mealTypes}`;
    }
    if (filter.dishTypes) {
      url += `&dishType=${filter.dishTypes}`;
    }
    url = encodeURI(url);
    return this.http.get(url, this.httpOptions);
  }

  getRecipe(recipeId: string): Observable<any> {
    let recipeUrl = `https://api.edamam.com/api/recipes/v2/`;
    let URL = `${recipeUrl}${recipeId}?type=public&app_id=${this.app_id}&app_key=${this.app_key}`;
    // console.log(id);
    return this.http.get<any>(URL, this.httpOptions);
  }
}
