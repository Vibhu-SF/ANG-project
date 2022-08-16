import { Component, Input, OnInit,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms"
import {GetUsersService} from '../services/get-users.service'
import { UserModel } from '../user/user-model';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  constructor(private api:GetUsersService) {
    
  }
   

 

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
  user_Details:any


 
  
  // for getting users detail passed from table commponent for edit a row
 
  @Input()
  update_check :string = "string"
  roles = Roles //enum for choosing role
  ngOnInit(): void {
    

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
//###################################################################################################################################################
  
  
  table_data(data:any){
    this.api.update_user(this.update_check,data).subscribe((result)=>{
      console.log(result)
      console.log(data)
      console.log(this.update_check)
      this.parent_function.emit(true)
      this.load_data_in_app.emit(true)
      
    })
  }
//################################################################################################################################################
prefill_form_data = new UserModel("","","","",1,"")



}
enum Roles{
  SuperAdmin=1,
  Admin=2,
  user=0
}
