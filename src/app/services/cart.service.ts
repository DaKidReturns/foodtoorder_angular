import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { Cart } from '../models/cart';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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

  base_url = "http://localhost:3000"
  httpHeader = {
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  httpError(error:HttpErrorResponse){
    let msg= ''
    if(error.error instanceof ErrorEvent){
      msg=error.error.message
    }
    else{
      msg = 'Error code:${error.status}\nMessgae:${error.message}'
    }
    console.error(msg)
    return throwError(msg)
  }

  constructor(private httpClient:HttpClient) { }

  addCart(cart:Cart):Observable<Cart>{
    return this.httpClient.get<Cart>(this.base_url+'/carts/'+cart.id)
    .pipe(catchError(this.httpError))
    //this.arrCart.push(cart)
  }
  getCartById(cartId: number):Observable<Cart> {
    return this.httpClient.get<Cart>(this.base_url+'/carts/'+cartId)
    .pipe(catchError(this.httpError))
    //return this.arrCart.find((cart)=>cart.userId=cartId) ?? new Cart(0,[],0);
  }

  getAllCart():Observable<Cart[]>{
    // return 
    return this.httpClient.get<Cart[]>(this.base_url+'/carts')
    .pipe(catchError(this.httpError))
    //return this.arrCart;
  }
  deleteCartById(i:number):Observable<Cart> {
    return this.httpClient.delete<Cart>(this.base_url+'/carts/'+i)
    .pipe(catchError(this.httpError))
    // var index = this.arrCart.findIndex((cart)=>cart.userId==i)
    // if(index == -1) return;
    // this.arrCart.splice(index,1)
  }
}
