/* Write the necessary Node script to make this code work for all arrays: */
Array.prototype.even = function(){
    let arr = this;
    return arr.filter((elem,i,arr) => elem % 2 == 0);
}

Array.prototype.odd = function(){
    let arr = this;
    return arr.filter((elem,i,arr) => elem % 2 != 0);
}
var arrInt = [1,2,3,4,5,6,7,8];

console.log(arrInt.even());
console.log(arrInt.odd());