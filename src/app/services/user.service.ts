import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addr1 = new Address(1, 89, "the street", "Red Area", "Sickle and hammer", "Solid State", "TryCount", "456724")
  // arrUsers = [
  //   new User(1, "Brian", "Cranston", "user", "12/04/1976", "breakinggood@gmail.com", "JesseWhereIsTheProduct",
  //     new Address(1, 22, "Rich Street", "Greener Area", "Star Stripped City", "Oil State", "Uncle's country", "777888")),
  //   new User(2, "Gandalf", "White", "admin", "01/03/1800", "mage@elfmail.com", "Youshallnotpass",
  //     new Address(1, 22, "For the street", "for the Area", "for the City", "for the State", "for the country", "437829")),
  //   new User(3, "Jonathan", "Jostar", "restaurantowner", "12/04/1888", "theultimateGentleman@gmail.com", "Diowhydidyoudothis",
  //     new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212")),
  //   new User(4, "Store", "Owner", "restaurantowner", "12/05/2003", "storeowner@gmail.com", "owner",
  //     new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212")),
  //   new User(5, "Store", "Owener2", "restaurantowner", "03/12/2001", "store2owner@gmail.com", "owner",
  //     new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212"))
  // ]
  token = localStorage.getItem("token") ?? ""
  base_url = "http://localhost:3000"
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')??""
    })
  }

  httpError(error:HttpErrorResponse){
    let msg=''
    if(error.error instanceof ErrorEvent){
      msg = error.error.message
    }
    else{
      msg = 'Error code:${error.status}\nMessage:${error.message}'
    }
    console.log(msg)
    return throwError(msg);
  }

  constructor(private httpClient:HttpClient) {
    
  }

  getUsers():Observable<User[]>{
    console.log(this.httpHeader)
    return this.httpClient.get<User[]>(this.base_url+'/users',this.httpHeader)
    .pipe(catchError(this.httpError));
  }

  // getUserById(userId: number): User {
  //   return this.arrUsers.find((u) => u.id == userId) ?? new User()
  // }
  getUserById(userId:number):Observable<User>{
    return this.httpClient.get<User>(this.base_url+'/users/'+userId).pipe(catchError(this.httpError))
  }
  
  getUserByRoles(role:string):Observable<User[]>{
    return this.httpClient.get<User[]>(this.base_url+'/users/role/'+role).pipe(catchError(this.httpError))
  }

  deleteUserById(i: number): Observable<User> {
    // var index = this.arrUsers.findIndex((usr) => usr.id == i)
    // if (index == -1) return;
    // this.arrUsers.splice(index, 1)
    return this.httpClient.delete<User>(this.base_url+'/users/'+i).pipe(catchError(this.httpError))
  }

  addUser(u: User): Observable<User> {
    // this.arrUsers.push(u)
    // console.log(this.arrUsers)
    return this.httpClient.post<User>(this.base_url+'/users',JSON.stringify(u),this.httpHeader)
    .pipe(catchError(this.httpError))
  }
  updateUser(u: User):Observable<User> {
    return this.httpClient.put<User>(this.base_url+'/users/'+u.id, JSON.stringify(u),this.httpHeader)

    // var index = this.arrUsers.findIndex((usr) => usr.id == u.id)
    // this.arrUsers[index] = u
    // // this.arrUsers.splice(index,1)
    // // this.arrUsers.fill(u,index,index+1)
    // console.log(this.arrUsers)
  }

  login(u:User):Observable<User>{
    return this.httpClient.post<User>(this.base_url+'/users/login',JSON.stringify(u),this.httpHeader)
  }
}
