import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from 'src/employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
   allEmployee:EmployeeModel[]=[]
   p: number = 1;
  
   searchkey:string=""
   //fetches the system time and date
   time:any = new Date()

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getEmployee()
  }

   getEmployee(){
     this.api.getAllEmployee().subscribe({
      next:(res:any)=>{
        //console.log(res);
        this.allEmployee=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
     })
   }


   sortById(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
   }

   sortByName(){
    //localeCompare()-letter
    //return -1,1,0 - before,after,equal
    //string-localeCompare(string to compare)
    this.allEmployee.sort((a:any,b:any)=>a.empUsername.localeCompare(b.empUsername))
   }

   removeEmployee(id:any){
     this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getEmployee()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
     })
   }

   generatePdf(){

    //create object for jsPDF
    const pdf = new jsPDF()

    let head = [['Id','Username','Email','Status']]

    const body:any = []
    this.allEmployee.forEach((item:any)=>{
      if(item.id!='1'){
        if(item.empStatus=='1'){
          body.push([item.id,item.empUsername,item.empEmail,'Active'])
        }
        else{
          body.push([item.id,item.empUsername,item.empEmail,'InActive'])
        }
      }
      

    })
    //fontsize,heading - optional
    pdf.setFontSize(16)
    pdf.text("Employee List",10,10)


   
    //call autotable function
    autoTable(pdf,{head,body})

    //new tab
    pdf.output('dataurlnewwindow')

    //dowload
    pdf.save('Emplyee Table.pdf')

   }
}
