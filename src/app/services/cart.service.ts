import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  arrCart = [
    new Cart(1,
      [
        new Dish(1, "Fried Rice", 180, ""),
        new Dish(4, "Chicken Chilli", 120, "")
      ], 300),
    new Cart(2,
      [
        new Dish(4, "Chilli Chiken", 120, ""),
        new Dish(12, "Lemon Tea", 20, ""),
      ], 140)
  ]
  constructor() { }

  getCartById(cartId: number):Cart {
    return this.arrCart.find((cart)=>cart.userId=cartId) ?? new Cart(0,[],0);
  }
  getAllCart(){
    return this.arrCart;
  }
  deleteCartById(i:number){
    var index = this.arrCart.findIndex((cart)=>cart.userId==i)
    if(index == -1) return;
    this.arrCart.splice(index,1)
  }
}
