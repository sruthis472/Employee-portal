import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  //fisrt argument value to be transform
  //second argument- based on which the transform 
  transform(allEmployee:any[],searchkey:string): any[] {

    const result:any=[]
    if(!allEmployee || searchkey==""){
      return allEmployee
    }
    allEmployee.forEach((item:any)=>{
      if(item.empUsername.trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result
  }

}
