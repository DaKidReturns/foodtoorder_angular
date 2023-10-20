import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enquiry } from 'src/app/models/enquiry';

@Component({
  selector: 'app-contactus-form',
  templateUrl: './contactus-form.component.html',
  styleUrls: ['./contactus-form.component.scss']
})
export class ContactusFormComponent {
  contactUsForm:FormGroup
  submitted:boolean = false
  enquiry:Enquiry= new Enquiry()
  constructor(fb:FormBuilder){
    this.contactUsForm=fb.group({
      name:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      description:['',Validators.required]
    })
  }

  get contactUsFormControl(){
    return this.contactUsForm.controls
  }

  OnSubmit(contactFormValue:string){
    this.submitted = true
    if(this.contactUsForm.invalid){
      // this.contactUsForm.get('email')?.
      return
    }
    this.enquiry.Name = this.contactUsForm.value.name
    this.enquiry.PhoneNumber= this.contactUsForm.value.phoneNumber
    this.enquiry.Email = this.contactUsForm.value.email
    this.enquiry.Description = this.contactUsForm.value.description

    console.log(this.enquiry)
  }
}
