import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';
import { Dish } from '../models/dish';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // arrRestaurants = [
  //   new Restaurant(1, "Capitalist Cafe", [
  //     new Address(1, 22, "Rich Street", "Greener Area", "Star Stripped City", "Oil State", "Uncle's country", "777888"),
  //     new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212")
  //   ],
  //     [
  //       new Dish(1, "Fried Rice", 180, ""),
  //       new Dish(4, "Chilli Chiken", 120, ""),
  //       new Dish(12, "Lemon Tea", 20, ""),
  //       new Dish(21, "Sweet rice", 130, ""),
  //       new Dish(7, "Chiken Biriyani", 200, ""),
  //       new Dish(14, "Mint Lime", 30, ""),
  //       ], "CapitalistCafe.jpg", 5,
  //   ),
  //   new Restaurant(2, "Communist Cold Drinks", [
  //     new Address(1, 89, "the street", "Red Area", "Sickle and hammer", "Solid State", "TryCount", "456724"),
  //     new Address(2, 65, "Golden Wind", "I 93 area", "What a wonderful city", "Happy state", "Star and red flag", "2374312")
  //   ], 
  //   [
  //     new Dish(2, "Veg pulav", 140, ""),
  //     new Dish(5, "Paneer Makani", 150, ""),
  //     new Dish(18, "Mango Lassi", 40, ""),
  //     new Dish(22, "Seera", 40, "")
  //       ], "CommunistColdDrinks.jpg", 4
  //   ),
  //   new Restaurant(3, "Democratic Bar", [
  //     new Address(1, 22, "For the street", "for the Area", "for the City", "for the State", "for the country", "437829"),
  //     new Address(2, 420, "By the street", "By the Area", "By the City", "By the State", "By the country", "237892"),
  //     new Address(3, 892, "To the street", "To the Area", "To the City", "To the State", "To the country", "294873"),
  //   ], [
  //     new Dish(4, "Chilli Chiken", 120, ""),
  //     new Dish(12, "Lemon Tea", 20, ""),
  //     new Dish(21, "Sweet rice", 130, ""),
  //     new Dish(2, "Veg pulav", 140, ""),
  //     new Dish(5, "Paneer Makani", 150, ""),
  //     new Dish(18, "Mango Lassi", 40, ""),
  //     new Dish(22, "Seera", 40, "")
  //   ], "DemocraticBar.jpg", 4
  //   ),
  // ]

  baseUrl = "http://localhost:3000"
  httpHeader = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  httpError(error:HttpErrorResponse){
    let msg=''
    if(error.error instanceof ErrorEvent){
      msg = error.error.message
    }
    else{
      msg='Error code:${error.status}\nMessage:${error.message}'
    }
    console.log(msg)
    return throwError(msg)
  }

  getRestaurants():Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(this.baseUrl+'/restaurants')
    .pipe(catchError(this.httpError));
  }

  getRestaurantById(id: number):Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(this.baseUrl+'/restaurants/'+id)
    .pipe(catchError(this.httpError))
  }

  deleteRestaurantById(id:number):Observable<Restaurant>{
    return this.httpClient.delete<Restaurant>(this.baseUrl+'/restaurants/'+id).pipe(catchError(this.httpError))
  }

//     getRestaurantByOwnerId(ownerId: number){  //TODO: CHANGE THIS FUNCTION TO ACCEPT DATA FROM SERVER
//     }

    addRestaurant(restaurant:Restaurant):Observable<Restaurant>{
      return this.httpClient.post<Restaurant>(this.baseUrl+'/restaurants', JSON.stringify(restaurant),this.httpHeader)
      .pipe(catchError(this.httpError))
    }
    updateRestaurant(restaurant:Restaurant):Observable<Restaurant>{
      return this.httpClient.put<Restaurant>(this.baseUrl+'/restaurants/'+restaurant.id, JSON.stringify(restaurant),this.httpHeader)
      .pipe(catchError(this.httpError))
    }
    
    /*
    Write a funtion which queries all the restaurants on a given date and displays the number of unavailable dishes. 
    Display this on the view restaurants component.
    */

   /*
   Returns an array of tuples with restaurant id and the number of dishes not available. for that particular restaurant.
   */
    getUnavailableDishes():Observable<[number,number][]>{
      let restaurantDishesUnavailable:[number,number][] = []
      return this.getRestaurants().pipe(map((data)=>{
        data.forEach((restaurant)=>{
          restaurantDishesUnavailable.push([restaurant.id,restaurant.items.filter((dish)=>dish.isAvailable == false).length])
        })
        return restaurantDishesUnavailable
      }))
    }

    getAllUnavailableDishes():Observable<number>{
      let totalDishesUnavailable:number = 0
      return this.getRestaurants().pipe(map((data)=>{
        data.forEach((restaurant)=>{
          totalDishesUnavailable += (restaurant.items.filter((dish)=>dish.isAvailable == false).length)
        })
        return totalDishesUnavailable
      }))
    }


    getDishes():Observable<Dish[]>{
      let dishesList:Dish[] = []
      return this.getRestaurants().pipe(map(data=>{
        data.forEach(restaurant => {
          restaurant.items.forEach(dish => {
            dishesList.push(dish)
          });
        });
        return dishesList
      }))
    }
}
