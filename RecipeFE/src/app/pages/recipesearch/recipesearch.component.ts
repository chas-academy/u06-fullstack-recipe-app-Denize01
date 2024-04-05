import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { RecipeidformatterPipe } from '../../pipes/recipeidformatter.pipe';
import { Filter } from '../../interfaces/filter';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [RouterLink, RecipeidformatterPipe, FormsModule],
  templateUrl: './recipesearch.component.html',
  styleUrl: './recipesearch.component.css',
})
export class RecipesearchComponent {
  recipes?: Recipe[];

  filter: Filter = {
    query: '',
    mealTypes: '',
    health: '',
    cuisineTypes: '',
    dishTypes: '',
  };

  constructor(private recipeService: RecipeService) {}

  searchRecipe() {
    this.recipeService.getRecipes(this.filter).subscribe((res) => {
      console.log(res);
      let recipes: Recipe[];

      recipes = res.hits.map(
        (item: {
          recipe: {
            label: any;
            image: any;
            ingredientLines: any;
            totalTime: any;
          };
          _links: { self: { href: any } };
        }) => {
          return {
            label: item.recipe.label,
            image: item.recipe.image,
            totalTime: item.recipe.totalTime,
            ingredientLines: item.recipe.ingredientLines,
            selfref: item._links.self.href,
          };
        }
      );

      console.table(recipes);
      this.recipes = recipes;
    });
  }
}
