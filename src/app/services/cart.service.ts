import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { Cart } from '../models/cart';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // arrCart = [
  //   new Cart(1,
  //     [
  //       new Dish(1, "Fried Rice", 180, ""),
  //       new Dish(4, "Chicken Chilli", 120, "")
  //     ], 300),
  //   new Cart(2,
  //     [
  //       new Dish(4, "Chilli Chiken", 120, ""),
  //       new Dish(12, "Lemon Tea", 20, ""),
  //     ], 140)
  // ]

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
      return this.httpClient.post<Cart>(this.base_url + '/carts', JSON.stringify(cart), this.httpHeader)
    .pipe(catchError(this.httpError))
  }
  getCartById(cartId: number):Observable<Cart> {
    return this.httpClient.get<Cart>(this.base_url+'/carts/'+cartId)
    .pipe(catchError(this.httpError))
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
  }

  updateCartAmount(cart:Cart){
    cart.amount=0;
    cart.items.forEach((item,index)=>{
      cart.amount+=item.cost*cart.quantity[index]
    })
  }

  addItemToCart(item:Dish,cart:Cart):Observable<Cart>{
    let index = cart.items.findIndex((cartItem)=>cartItem.name==item.name)
    if(index != -1){
      cart.quantity[index] += 1
    }else{
      cart.items.push(item)
      cart.quantity.push(1)
    }
    return this.updateCart(cart)
    // this.updateCartAmount(cart)
    // return this.httpClient.put<Cart>(this.base_url+'/carts/'+cart.id,JSON.stringify(cart),this.httpHeader)
    // .pipe(catchError(this.httpError))
  }


   removeItemFromCart(item:Dish,cart:Cart):Observable<Cart>{
    let index = cart.items.findIndex((cartItem)=>cartItem.name==item.name)
    if(index == -1) 
    return this.updateCart(cart)

    if(cart.quantity[index]>1){
      cart.quantity[index] -= 1
    }
    else if(cart.quantity[index]==1){
      cart.items.splice(index,1)
      cart.quantity.splice(index,1)
    }
    return this.updateCart(cart)
  }


  updateCart(cart:Cart):Observable<Cart>{
    this.updateCartAmount(cart)
    return this.httpClient.put<Cart>(this.base_url+'/carts/'+cart.id,JSON.stringify(cart),this.httpHeader)
    .pipe(catchError(this.httpError))
  }
}
