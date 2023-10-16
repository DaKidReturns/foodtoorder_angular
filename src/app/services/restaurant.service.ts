import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  arrRestaurants = [
    new Restaurant(1, "Capitalist Cafe", [
      new Address(1, 22, "Rich Street", "Greener Area", "Star Stripped City", "Oil State", "Uncle's country", "777888"),
      new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212")
    ],
      [
        new Dish(1, "Fried Rice", 180, ""),
        new Dish(4, "Chilli Chiken", 120, ""),
        new Dish(12, "Lemon Tea", 20, ""),
        new Dish(21, "Sweet rice", 130, ""),
        new Dish(7, "Chiken Biriyani", 200, ""),
        new Dish(14, "Mint Lime", 30, ""),
        ], "CapitalistCafe.jpg", 5,
    ),
    new Restaurant(2, "Communist Cold Drinks", [
      new Address(1, 89, "the street", "Red Area", "Sickle and hammer", "Solid State", "TryCount", "456724"),
      new Address(2, 65, "Golden Wind", "I 93 area", "What a wonderful city", "Happy state", "Star and red flag", "2374312")
    ], 
    [
      new Dish(2, "Veg pulav", 140, ""),
      new Dish(5, "Paneer Makani", 150, ""),
      new Dish(18, "Mango Lassi", 40, ""),
      new Dish(22, "Seera", 40, "")
        ], "CommunistColdDrinks.jpg", 4
    ),
    new Restaurant(3, "Democratic Bar", [
      new Address(1, 22, "For the street", "for the Area", "for the City", "for the State", "for the country", "437829"),
      new Address(2, 420, "By the street", "By the Area", "By the City", "By the State", "By the country", "237892"),
      new Address(3, 892, "To the street", "To the Area", "To the City", "To the State", "To the country", "294873"),
    ], [
      new Dish(4, "Chilli Chiken", 120, ""),
      new Dish(12, "Lemon Tea", 20, ""),
      new Dish(21, "Sweet rice", 130, ""),
      new Dish(2, "Veg pulav", 140, ""),
      new Dish(5, "Paneer Makani", 150, ""),
      new Dish(18, "Mango Lassi", 40, ""),
      new Dish(22, "Seera", 40, "")
    ], "DemocraticBar.jpg", 4
    ),
  ]
  constructor() { }
  getRestaurants() {
    return this.arrRestaurants
  }

  getRestaurantById(id: number) {
    for (let i = 0; i < this.arrRestaurants.length; i++) {
      if (this.arrRestaurants[i].id == id)
        return this.arrRestaurants[i];
    }
    return new Restaurant(0, "", [], [], "");
  }

  deleteRestaurantById(id:number){
   
    var index = this.arrRestaurants.findIndex((rest)=> rest.id==id) 
    if(index == -1 ) return;
    console.log("Deleting restaurant"+index)
    this.arrRestaurants.splice(index,1)
  }

    getRestaurantByOwnerId(ownerId: number) {
        console.log(ownerId)
        var arrReturnRestaurants: Restaurant[] = []
        for (let i = 0; i < this.arrRestaurants.length; i++) {
            if (this.arrRestaurants[i].ownerId == ownerId) {
                arrReturnRestaurants.push(this.arrRestaurants[i])
            }
        }
        return arrReturnRestaurants;
    }

    addRestaurant(restaurant:Restaurant){
      
    }
}
