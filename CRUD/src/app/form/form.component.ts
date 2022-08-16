import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Optional,Output,EventEmitter } from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms"
import {GetUsersService} from "../services/get-users.service"


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  

// reactive form 
  user_details = new FormGroup({
    firstname: new FormControl("",[Validators.required]),
    middle_name: new FormControl(""),
    lastname: new FormControl("",[Validators.required]),
    contact: new FormControl("",Validators.required),
    role: new FormControl("",[Validators.required]),
    address: new FormControl("",[Validators.required])


  })
  @Output() parent_function : EventEmitter<any> = new EventEmitter() // for using function written in parent component
  @Output() load_data_in_app:EventEmitter<any> = new EventEmitter()

  @Input()
  update_enable:boolean = false //its value will come from parent component and it will help to validate wheather a put operation is gona hit
  // or a post operation here 

  @Input()
  update_check:string = "string" // its value is also come from its  parent component and it help's in update operation for finding a particular 
  //users data
   
  roles = Roles //enum for choosing role

  constructor(private api:GetUsersService) { }

  ngOnInit(): void {
    console.log(this.update_enable)

  }
 //getters for reactive form
  get firstname(){
    return this.user_details.get("firstname")
  }
  get lastname(){
    return this.user_details.get("lastname")
  }
  get contact(){
    return this.user_details.get("contact")
  }
  get role(){
    return this.user_details.get("role")
  }
  get address(){
    return this.user_details.get("address")
  }
  //function will be called whenever the form form is submitted
  
  table_data(data:any){
      console.warn("api call")
      this.api.add_user(data).subscribe((result)=>{
        console.log(result)
        this.parent_function.emit(true)
        this.load_data_in_app.emit(true)
      
      })
  }
  

}
//Enum for Roles
enum Roles{
  SuperAdmin=1,
  Admin=2,
  user=0
}
