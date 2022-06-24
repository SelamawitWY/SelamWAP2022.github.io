

 console.log("*****************Function 1: Sum**********************");
function sum(arr){

    if(Array.isArray(arr)){
        
      var total = arr.filter(function(a,i,array){
                   return a > 20;
                  }).reduce(function(preVal, currentVal, i, array){
                     return preVal + currentVal;
                  }, 0);
            
            return total;
    } else {
            console.log("Invalid input")
    }
 
 }
 
 console.log(sum([20, 22, 5, 60])); //82
 console.log(sum([])); //0
 console.log(sum("Selamawit"));//Invalid input

 console.log("*****************Function 2: getNewArray**********************");

 const getNewArray = (strArray) => {

    if(Array.isArray(strArray)){
        
              var newArray = strArray.filter(function(a,i,array){
                   return (a.length >= 5 && a.includes('a'));
                  });
          return newArray;
    } else {
            console.log("Invalid input")
    }
 
 }
 
 
 console.log(getNewArray(['2a20', 'selam', 5, 60])); //["selam"]
 console.log(getNewArray([])); //[]
 console.log(getNewArray("selamina")); //Invalid input