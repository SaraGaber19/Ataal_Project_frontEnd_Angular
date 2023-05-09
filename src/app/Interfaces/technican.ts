export interface Technican {
  id:number,
  name:string,
  photo:string,
  rate:number,
  address:string,
  breif?:string,
  allProblemsCount:number;
  sections?:{id:number,name:string}[]

}
