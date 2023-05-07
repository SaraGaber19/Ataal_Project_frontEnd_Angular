export interface Technican {
  id:number,
  name:string,
  photo:string,
  rate:number,
  address:string,
  breif?:string,
  sections?:{id:number,name:string}[]

}
