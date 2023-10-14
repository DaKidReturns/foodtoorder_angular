import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  arrOrders = [
    new Order(12, 1,
      [
        new Dish(1, "Fried Rice", 180, ""),
        new Dish(4, "Chilli Chiken", 120, ""),
        new Dish(12, "Lemon Tea", 20, ""),
        new Dish(18, "Mango Lassi", 40, ""),
        new Dish(21, "Sweet rice", 130, "")
      ], 450, "12/03/2021"),

    new Order(15, 1,
      [
        new Dish(7, "Chiken Biriyani", 200, ""),
        new Dish(14, "Mint Lime", 30, ""),
        new Dish(29, "Gulab Jamun", 10, "")
      ], 240, "31/03/2022"),

    new Order(2, 2,
      [
        new Dish(2, "Veg pulav", 140, ""),
        new Dish(5, "Paneer Makani", 150, ""),
        new Dish(18, "Mango Lassi", 40, ""),
        new Dish(22, "Seera", 40, "")
      ], 270, "21/04/2023")]
      
  constructor() { }

  getAllOrders() {
    return this.arrOrders;
  }

  getOrderById(i:number){
    return this.arrOrders.find((order)=>order.orderId==i)?? new Order(0,0,[],0,"");
  }
  deleteOrderById(i:number){
    var index = this.arrOrders.findIndex((ord)=> ord.orderId==i) 
    if(index == -1 ) return;
    this.arrOrders.splice(index,1)
  }
}
