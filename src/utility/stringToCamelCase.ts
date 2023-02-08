export const stringToCamelCase = function camelize(str:any) {
    return str.replace(/\W+(.)/g, function(match:any, chr:any)
     {
          return chr.toUpperCase();
      });
}