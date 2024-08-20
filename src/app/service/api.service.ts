import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  serverURL:string="http://localhost:4000"
  

  dataShare = new BehaviorSubject(false)

  constructor(private http:HttpClient) { }
updateData(data:any){
  this.dataShare.next(data)
}

  loginApi(){
     return this.http.get(`${this.serverURL}/employee/1`)
  }

  addEmployeeApi(reqbody:any){
    return this.http.post(`${this.serverURL}/employee`,reqbody)

  }

  getAllEmployee(){
    return this.http.get(`${this.serverURL}/employee`)
  }

  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.serverURL}/employee/${id}`) 
  }

  getEmployeeApi(id:any){
    return this.http.get(`${this.serverURL}/employee/${id}`)
  }

  updateEmployeeDetailsApi(id:any,reqbody:any){
    return this.http.put(`${this.serverURL}/employee/${id}`,reqbody)
  }

  updateAdminDetails(reqbody:any){
    return this.http.put(`${this.serverURL}/employee/1`,reqbody)

  }
}
