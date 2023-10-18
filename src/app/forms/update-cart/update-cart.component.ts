import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Cart } from 'src/app/models/cart';
import { Dish } from 'src/app/models/dish';;
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.scss']
})
export class UpdateCartComponent {
  arrUsers: User[] = []
  cartUpdated: Cart = new Cart()

  userFormGroup: FormGroup
  itemFormGroup: FormGroup
  itemCount: number = 0

  countSecondFormSubmit: number = 0

  isLinear = true;
  userIdUpdated: number = -1;

  constructor(private formBuilder: FormBuilder, private cartService:CartService, private userService: UserService) {
    // this.orderService.getAllOrders().subscribe((data) => this.arrUserOrders = data)
    this.userFormGroup = formBuilder.group({
      'userId': ['',Validators.required],
    })
    this.itemFormGroup = formBuilder.group({
      itemFormArray: formBuilder.array([])
    })
    userService.getUsers().subscribe((data) => this.arrUsers = data)
  }

  get itemFormArray(): FormArray {
    return this.itemFormGroup.get('itemFormArray') as FormArray
  }

  createItemFormArray() {
    this.itemCount++
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'cost': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required)
    })
  }

  updateItemFormArray(dish:Dish,quantity:number){
    this.itemCount++
    return new FormGroup({
      'name': new FormControl(dish.name, Validators.required),
      'cost': new FormControl(dish.cost, Validators.required),
      'quantity': new FormControl(quantity, Validators.required)
    })
  }

  saveFirstStepData(formData: any) {
    // an unwanted function inherited when copying the code 
    // clean this
  }

  saveSecondStepData(itemFormGroup: any) {
    this.countSecondFormSubmit++;
    console.log(this.countSecondFormSubmit, this.itemCount)
    if (this.countSecondFormSubmit == this.itemCount) {
      console.log(this.itemCount)
      let itemArr = Object.values(itemFormGroup)
      let temp = JSON.parse(JSON.stringify(itemArr))[0]
      console.log(temp)
      temp.forEach((item: any, index: number) => {
        this.cartUpdated.items.push(new Dish(index+1, item.name, parseFloat(item.cost)??0, ""))
        this.cartUpdated.quantity.push(parseInt(item.quantity)??0)
      })
      this.cartUpdated.amount = 0;
      this.cartUpdated.items.forEach((item,index)=>{
        this.cartUpdated.amount += item.cost * this.cartUpdated.quantity[index]
      })
      console.log(this.cartUpdated);
      this.cartService.updateCart(this.cartUpdated).subscribe()
    }
  }

  onSelectUser(event: any) {
    var idObtained = event.target.value
    // console.log(idObtained.split(":")[1].trim())
    this.userIdUpdated = parseInt(idObtained.split(":")[1].trim())
    if(this.userIdUpdated == 0){
      return
    }
    this.userFormGroup.get('userId')?.setValue(this.userIdUpdated)
    // this.userService.getUserById(this.userIdUpdated).subscribe((data) => {
    //   // console.log(data)
    //   this.userFormGroup.get('userId')?.setValue(data.id)
    // })
    this.cartService.getCartById(this.userIdUpdated).subscribe((data)=>{
      console.log(data)
      this.cartUpdated.id = data.id
      data.items.forEach((item,index)=>{
        const itemFormArray = this.itemFormGroup.get('itemFormArray') as FormArray
        itemFormArray.push(this.updateItemFormArray(item,data.quantity[index]))
      })
      this.countSecondFormSubmit = this.itemCount - 1
    })
    
  }

  removeOrClearItems(i: number) {
    const itemFormArray = this.itemFormGroup.get('itemFormArray') as FormArray
    if (itemFormArray.length > 1) {
      itemFormArray.removeAt(i)
    }
    else {
      itemFormArray.reset()
    }
  }

  addItemFormGroup(){
    const itemFormArray = this.itemFormGroup.get('itemFormArray')as FormArray
    itemFormArray.push(this.createItemFormArray())
  }

  clearAllItems(){
    const itemFormArray = this.itemFormGroup.get('itemFormArray') as FormArray
    itemFormArray.clear()
    // for(let i=0; i<itemFormArray.length;i++){
    //   itemFormArray.removeAt(i)
    // }
  }
}
