import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeListItem } from '../../services/dataModel/recipeListItem';
import { ListService } from '../../services/ListService';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // public recipes = [ {
  //   name : "orez cu lapte",
  //   description : "orez + lapte"
  //   },
  //   {
  //   name : "clatite cu gem",
  //   description : "clatite + gem"
  //   }
  // ];

  // public recipeList: Observable<RecipeListItem[]>;
  public recipeList: RecipeListItem[];
  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getAllListItems().subscribe(retete => {
      this.recipeList = retete;
    });
  }

}
