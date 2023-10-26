import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Dish } from '../models/dish';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // arrOrders = [
  //   new Order(12, 1,
  //     [
  //       new Dish(1, "Fried Rice", 180, ""),
  //       new Dish(4, "Chilli Chiken", 120, ""),
  //       new Dish(12, "Lemon Tea", 20, ""),
  //       new Dish(18, "Mango Lassi", 40, ""),
  //       new Dish(21, "Sweet rice", 130, "")
  //     ], 450, "12/03/2021"),

  //   new Order(15, 1,
  //     [
  //       new Dish(7, "Chiken Biriyani", 200, ""),
  //       new Dish(14, "Mint Lime", 30, ""),
  //       new Dish(29, "Gulab Jamun", 10, "")
  //     ], 240, "31/03/2022"),

  //   new Order(2, 2,
  //     [
  //       new Dish(2, "Veg pulav", 140, ""),
  //       new Dish(5, "Paneer Makani", 150, ""),
  //       new Dish(18, "Mango Lassi", 40, ""),
  //       new Dish(22, "Seera", 40, "")
  //     ], 270, "21/04/2023")
  // ]

  base_url = "http://localhost:3000"
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  httpError(error:HttpErrorResponse){
    let msg= ''
    if(error.error instanceof ErrorEvent){
      msg=error.error.message
    }
    else{
      msg = "Error code:"+ error.status+"\nMessgae:"+error.message
    }
    console.error(msg)
    return throwError(msg)
  }
  constructor(private httpClient:HttpClient) { }

  getAllOrders():Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.base_url+'/orders')
    .pipe(catchError(this.httpError))
    // return this.arrOrders;
  }

  getOrderById(i: number):Observable<Order> {
    return this.httpClient.get<Order>(this.base_url + '/orders/' + i)
    // return this.arrOrders.find((order) => order.id == i) ?? new Order(0, 0, [], 0, "");
  }
  deleteOrderById(i: number) : Observable<Order>{
    return this.httpClient.delete<Order>(this.base_url + '/orders/' + i)
    // var index = this.arrOrders.findIndex((ord) => ord.id == i)
    // if (index == -1) return;
    // this.arrOrders.splice(index, 1)
  }
  addOrder(order:Order): Observable<Order>{
    return this.httpClient.post<Order>(this.base_url+'/orders',JSON.stringify(order),this.httpHeader)
    .pipe(catchError(this.httpError))
  }
  updateOrder(order:Order):Observable<Order>{
    return this.httpClient.put<Order>(this.base_url+"/orders/"+order.id,JSON.stringify(order),this.httpHeader)
  }
}
