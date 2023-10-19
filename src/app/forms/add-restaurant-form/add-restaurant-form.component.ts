import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray} from '@angular/forms';

import { Address } from 'src/app/models/address';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-add-restaurant-form',
  templateUrl: './add-restaurant-form.component.html',
  styleUrls: ['./add-restaurant-form.component.scss'],
})
export class AddRestaurantFormComponent {
  arrRestaurants:Restaurant[]=[]
  public addressForm:FormGroup
  restaurant:Restaurant
  
  firstFormGroup = this._formBuilder.group({
    'restaurantName': ['', Validators.required],
    'restaurantImage':['',Validators.required],
    'ownerId':['',Validators.required]
  });
  
  dishesFormGroup:FormGroup
  
  isLinear = false;
  count:number = 0;
  countSecondFormSubmit:number = 0;
  addresses: Address[]=[]

  dishCount:number=0
  countThirdFormSubmit: number=0;
  
  constructor(private _formBuilder: FormBuilder, private restaurantService:RestaurantService) {
    this.restaurant = new Restaurant(0,"",[],[],"",0)
    this.restaurantService.getRestaurants().subscribe((data)=>{this.arrRestaurants=data});
    
    this.addressForm = this._formBuilder.group({
      form_array_address:this._formBuilder.array([this.createAddressFormGroup()])
    })

    this.dishesFormGroup = this._formBuilder.group({
      dishesFormArray : this._formBuilder.array([this.createDishesFormGroup()])
    })
    
  }

  saveFirstStepData(formData:FormGroup){
    // Set the restaurant Id
    let tempId = 0
    let maxId = 0
    this.arrRestaurants.forEach((r)=>{
      if(r.id>maxId){
        maxId = r.id
      }
    })
    tempId = maxId +1;
    console.log(formData)

    this.restaurant.id = tempId
    this.restaurant.name = formData.value['restaurantName']
    this.restaurant.image = formData.value['restaurantImage']
    this.restaurant.ownerId = parseInt(formData.value['ownerId'])??0
    console.log(this.restaurant)
  }

  saveSecondStepData(formData:FormGroup){
    this.countSecondFormSubmit++;
    if(this.countSecondFormSubmit == this.count){
      console.log(this.count)
      let addressArr = Object.values(formData)
      let count = 1;
      addressArr.forEach((a)=>{})
      this.addresses = addressArr

      let temp = JSON.parse(JSON.stringify(this.addresses))
      this.restaurant.addresses = temp[0]
      this.restaurant.addresses.forEach((a,i)=>{
        a.id = i+1
      })
      console.log(this.restaurant.addresses);
    }
  }

  form_array_address():FormArray{
    return this.addressForm.get("form_array_address") as FormArray
  }

  public addAddressFormGroup() {
    const form_array_addresses = this.addressForm.get('form_array_address') as FormArray
    form_array_addresses.push(this.createAddressFormGroup())
  }

  public removeOrClearAddress(i: number) {
    const form_array_addresses = this.addressForm.get('form_array_address') as FormArray
    if (form_array_addresses.length > 1) {
      form_array_addresses.removeAt(i)
    }
    else {
      form_array_addresses.reset()
    }
  }

  private createAddressFormGroup():FormGroup{
    this.count++
    return new FormGroup({
        'id':new FormControl(''),
        'houseNo':new FormControl('',Validators.required),
        'street':new FormControl('',Validators.required),
        'area':new FormControl('',Validators.required),
        'state':new FormControl('',Validators.required),
        'city':new FormControl('',Validators.required),
        'country':new FormControl('',Validators.required),
        'pincode':new FormControl('',Validators.required),
    });
  }

  dishesFormArray() : FormArray{
    return this.dishesFormGroup.get("dishesFormArray") as FormArray
  }

  addDishesFormGroup(){
    const dishesFormArray = this.dishesFormGroup.get('dishesFormArray')as FormArray
    dishesFormArray.push(this.createDishesFormGroup())
  }

  removeOrClearDishes(i:number){
    const dishesFormArray = this.dishesFormGroup.get('dishesFormArray')as FormArray
    if(dishesFormArray.length>1){
      dishesFormArray.removeAt(i)
    }
    else{
      dishesFormArray.reset()
    }
  }

  saveThirdStepData(formGroup:FormGroup){
    this.countThirdFormSubmit++;
    if(this.countThirdFormSubmit == this.dishCount){
      let dishes = Object.values(formGroup)
      let temp = JSON.parse(JSON.stringify(dishes)) // This will remove any empty forms from the input
      console.log(temp)
      this.restaurant.items = temp[0]
      this.restaurant.items.forEach((item,i)=>{
        item.id = i+1
      })
      // console.log(this.restaurant)
      this.restaurantService.addRestaurant(this.restaurant).subscribe()
    } 
  }

  private createDishesFormGroup():FormGroup{
    this.dishCount++;
    return new FormGroup({
      'id':new FormControl(''),
      'name':new FormControl(''),
      'cost':new FormControl(''),
      'description':new FormControl(''),
      'isAvailable':new FormControl('',Validators.required)
    })
  }
}

