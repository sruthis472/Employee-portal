import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selected:Date = new Date()
  
    Highcharts: typeof Highcharts = Highcharts; // required
   
    chartOptions= { }; // required
    
    isClicked:boolean= false
    
    adminDetails:any =[]

    total:number = 0

    profImg:string="https://cdn-icons-png.flaticon.com/512/1803/1803615.png"

    constructor(private api:ApiService){
      this.chartOptions={
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Project Completion Report'
        },
        tooltip: {
            valueSuffix: '%'
        },
       
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.5
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        credits:{
          enabled:false
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    {
                        name: '',
                        y: 55.02
                    },
                    {
                        name: 'Fat',
                        sliced: true,
                        selected: true,
                        y: 26.71
                    },
                    {
                        name: 'Carbohydrates',
                        y: 1.09
                    },
                    {
                        name: 'Protein',
                        y: 15.5
                    },
                    {
                        name: 'Ash',
                        y: 1.68
                    }
                ]
            }
        ]
  
    }
    }

 ngOnInit(): void {
     this.api.loginApi().subscribe({
        next:(res:any)=>{
            console.log(res);
            this.adminDetails = res
            if(res.profile){
                this.profImg=res.profile
            }
         },
         error:(err:any)=>{
             console.log(err);
             
             
         }
     })



     this.api.getAllEmployee().subscribe({
        next:(res:any)=>{
           this.total = res.length-1 
        },
        error:(err:any)=>{
            console.log(err);
            
        }
     })
 }

    buttonClick(){
        this.isClicked=true
    }

    cancel(){
        this.isClicked=false
        if(this.adminDetails.profile){
            this.profImg = this.adminDetails.profile
        }
        else{
          this.profImg = "https://cdn-icons-png.flaticon.com/512/1803/1803615.png"  
        }
    }
    getFile(event:any){
        console.log(event.target.files[0]);
        const file = event.target.files[0]
        //FileReader = this class is used to convert a file into url

        //1)create an object for the class
        const fr=new FileReader()


        //url convert
        fr.readAsDataURL(file)

        //inorder to access url -onload()
        fr.onload = (event:any)=>{
            console.log(event.target.result);
            this.profImg=event.target.result
            
        }
}

updateAdmin(){
    this.adminDetails.profile=this.profImg
    console.log(this.adminDetails);
    this.api.updateAdminDetails(this.adminDetails).subscribe({
        next:(res:any)=>{
            console.log(res);
           
            Swal.fire({
              title: 'Wow!',
              text: 'Profile updated successfully',
              icon:'success'
          })
          this.isClicked = false  
          },
          error:(err:any)=>{
            console.log(err);
            Swal.fire({
              title: 'OOps',
              text: 'Something went wrong',
              icon:'error'
          })
          }
    })
    
}


}
