import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contactus-form',
  templateUrl: './contactus-form.component.html',
  styleUrls: ['./contactus-form.component.scss']
})
export class ContactusFormComponent {
  contactUsForm:FormGroup

  constructor(fb:FormBuilder){
    this.contactUsForm=fb.group({
      
    })
  }
}
