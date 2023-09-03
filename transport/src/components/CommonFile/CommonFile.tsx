import moment from "moment";

export const matchDate=(date1:any,date2:any)=>{
   
   return moment(date1).format("MMM Do YY") ===  moment(date2).format("MMM Do YY");

}