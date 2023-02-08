export const filterPagesData = (pageData:any) => {
    const filterPageData:any = {
    }

    //array of keys
    const filterArray:any = [];
  
    // filtering false values
    Object.entries(pageData).filter((item:any) => {
        if((item[1] && !Array.isArray(item[1]) ) || ( Array.isArray(item[1]) && item[1].length > 0 ) ){
                filterPageData[item[0]] = item[1]
        }
    })
    
    //pushing object key into an array
    Object.entries(filterPageData).map(item => {
      filterArray.push(item[0]);
      })
      
    //getting only the coment and rating values
      filterArray.map((item:any,index:number)=>{  
          filterArray.map((item2:any,index2:number)=>{
              if(item.slice(item.indexOf('_') + 1) === item2.slice(item2.indexOf('_') + 1) && index !== index2 && index <index2){
                  var ratingValue = filterPageData[item]
                  var ratingCommentValue =  filterPageData[item2]
                  delete filterPageData[item];
                  delete filterPageData[item2];
                  filterPageData[item] = {
                      rating: ratingValue,
                      comment: ratingCommentValue
                  }
              }
          })
      })
    return filterPageData;
  }