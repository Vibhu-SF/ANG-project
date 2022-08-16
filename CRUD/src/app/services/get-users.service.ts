import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Employee } from 'src/data_models.ts/employe_Data_Model';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  
  all_user_url = 'http://127.0.0.1:8000/all_user'  
  add_user_url ="http://localhost:8000/add_user"
  update_url = "http://127.0.0.1:8000/update_user?contact="
  
  
  constructor(private http:HttpClient) { }
  get_user(){
    return this.http.get(this.all_user_url)
  }
  get_data(contact:string){
    let get_user_url = "http://localhost:8000/user_by_contact?contact="+contact
    return this.http.get(get_user_url)
  }
  add_user(data:any){
    return this.http.post(this.add_user_url,data)

  }
  delete_user(data:string){
    let delete_url = "http://localhost:8000/delete_user?contact=" +data
    console.log(delete_url)
    return this.http.delete(delete_url)
  }
  update_user(data:string,details:any){
    console.log("working")
    return this.http.put<any>(this.update_url+data,details)
  }
  
}
