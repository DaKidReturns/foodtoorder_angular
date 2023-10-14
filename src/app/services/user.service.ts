import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addr1 = new Address(1, 89, "the street", "Red Area", "Sickle and hammer", "Solid State", "TryCount", "456724")
  arrUsers = [
    new User(1, "Brian", "Cranston", "user", "12/04/1976", "breakinggood@gmail.com", "JesseWhereIsTheProduct", "22/1 Albaquerque"),
    new User(2, "Gandalf", "White", "admin", "01/03/1800", "mageSupereme@Elfmail.com", "Youshallnotpass", "45 MiddleEarth"),
    new User(3, "Jonathan", "Jostar", "restaurantowner", "12/04/1888", "theultimateGentleman@gmail.com", "Diowhydidyoudothis", "22/1 London")
  ]
  constructor() { }

  getUsers() {
    return this.arrUsers

  }

  getUserById(userId:number):User {
    return this.arrUsers.find((u)=>u.id == userId) ?? new User(0,"","","","","","","")
    // for (let i=0; i<this.arrUsers.length; i++){
    //   if(arrUser[i].)
    // }
  }
  deleteUserById(i:number){
    var index = this.arrUsers.findIndex((usr)=> usr.id==i) 
    if(index == -1 ) return;
    this.arrUsers.splice(index,1)
  }
}
