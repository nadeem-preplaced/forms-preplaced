export const objectDifferenece = (obj1:any, obj2:any) => {
   Object.keys(obj1).forEach((key:any) => {
      if(obj1[key] === obj2[key] || obj1[key].length === obj2[key].length){
          delete obj2[key];
      }
   });
  return obj2;
}