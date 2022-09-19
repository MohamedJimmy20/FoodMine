import { FOODS_BY_SEARCH_URL, FOODS_URL, FOOD_BY_ID_URL } from './../shared/constants/urls';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable <Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodBySearchTerm(searchTerm: string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  getFoodById(foodId:number): Observable <Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);

  }


}
