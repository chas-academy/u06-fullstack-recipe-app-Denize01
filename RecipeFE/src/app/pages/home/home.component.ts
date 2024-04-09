import { Component, PipeTransform } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Filter } from '../../interfaces/filter';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../interfaces/recipe';
import { RecipeidformatterPipe } from '../../pipes/recipeidformatter.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RecipeidformatterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipes?: Recipe[];

  filter: Filter = {
    query: '',
    mealTypes: '',
    health: '',
    cuisineTypes: '',
    dishTypes: 'Desserts',
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.suggestions();
  }

  suggestions() {
    this.recipeService.getRecipes(this.filter).subscribe((res) => {
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
      this.recipes = recipes;
    });
  }
}
