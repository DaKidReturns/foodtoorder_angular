import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  arrDishes = [
    new Dish(1, "Fried Rice", 180, ""),
    new Dish(4, "Chilli Chiken", 120, ""),
    new Dish(12, "Lemon Tea", 20, ""),
    new Dish(21, "Sweet rice", 130, ""),
    new Dish(7, "Chiken Biriyani", 200, ""),
    new Dish(14, "Mint Lime", 30, ""),
    new Dish(29, "Gulab Jamun", 10, ""),
    new Dish(2, "Veg pulav", 140, ""),
    new Dish(5, "Paneer Makani", 150, ""),
    new Dish(18, "Mango Lassi", 40, ""),
    new Dish(22, "Seera", 40, "")
  ]
  constructor() { }

  getDish() {
    return this.arrDishes;
  }
  
}
