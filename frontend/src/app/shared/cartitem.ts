import { Food } from 'src/app/shared/models/Food';

export class cartItem{
  constructor(public food:Food){
    this.food = food;
  }

  quantity:number = 1 ;

  get price():number{
    return this.food.price * this.quantity;
  }

}
