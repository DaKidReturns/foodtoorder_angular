import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addr1 = new Address(1, 89, "the street", "Red Area", "Sickle and hammer", "Solid State", "TryCount", "456724")
  arrUsers = [
    new User(1, "Brian", "Cranston", "user", "12/04/1976", "breakinggood@gmail.com", "JesseWhereIsTheProduct", 
      new Address(1, 22, "Rich Street", "Greener Area", "Star Stripped City", "Oil State", "Uncle's country", "777888")),
    new User(2, "Gandalf", "White", "admin", "01/03/1800", "mage@elfmail.com", "Youshallnotpass", 
      new Address(1, 22, "For the street", "for the Area", "for the City", "for the State", "for the country", "437829")),
    new User(3, "Jonathan", "Jostar", "restaurantowner", "12/04/1888", "theultimateGentleman@gmail.com", "Diowhydidyoudothis", 
      new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212")),
    new User(4, "Store", "Owner", "restaurantowner", "12/05/2003", "storeowner@gmail.com", "owner", 
      new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212")),
    new User(5, "Store", "Owener2", "restaurantowner", "03/12/2001", "store2owner@gmail.com", "owner", 
      new Address(2, 32, "White Street", "Golden area", "WhiteFlag", "Over Engineered State", "Rising Sun", "648212"))
  ]
  constructor() { }

  getUsers() {
    return this.arrUsers

  }

  getUserById(userId: number): User {
    return this.arrUsers.find((u) => u.id == userId) ?? new User(0, "", "", "", "", "", "", new Address())
    // for (let i=0; i<this.arrUsers.length; i++){
    //   if(arrUser[i].)
    // }
  }
  deleteUserById(i: number) {
    var index = this.arrUsers.findIndex((usr) => usr.id == i)
    if (index == -1) return;
    this.arrUsers.splice(index, 1)
  }

  addUser(u:User){
    this.arrUsers.push(u)
    console.log(this.arrUsers)
  }
}
