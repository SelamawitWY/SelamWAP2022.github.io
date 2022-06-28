//1. Global lexical environment
let globalAtCreationLE = {makeArmy: fn, outer: null};
let globalAtExecutionLE = {makeArmy: fn, army:[fn, fn], outer: null};

//2. makeArmy lexical environment
let makeArmyAtCreationLE = {arguments: {length: 0}, outer: global};
let makeArmyAtExecutionLE = {i : 2, shooters :[fn,fn], arguments: {length: 0}, outer: global};

//3. both while0 aand while1 have same lexical environment
let whileBlockAtCreationLE = {outer: makeArmy};
let whileBlockAtExecutionLE = {outer: makeArmy, shooter: fn};

//3. army0 lexical environment
let army0AtCreationLE = {outer: while_0, arguments:{length:0}};
let army0AtExecutionLE = {outer: while_0, arguments:{length:0}}; //closure = makeArmy , i = 2 
 
function makeArmy(){
    let shooters = [] ;
    let i = 0;
    
    while( i < 2 ){
     let j = i;
     let shooter = function(){
         console.log(j);
     }
     
     shooters.push(shooter);
     i++;
    }
    
    return shooters;
 }
 
 let army = makeArmy();
 army[0]();


/* ============== After fixing the code ============== */

//1. Global lexical environment
let globalAtCreationLE2 = {makeArmy: fn, outer: null};
let globalAtExecutionLE2 = {makeArmy: fn, army:[fn, fn], outer: null};

//2. makeArmy lexical environment
let makeArmyAtCreationLE2 = {arguments: {length: 0}, outer: global};
let makeArmyAtExecutionLE2 = {i : 2, shooters :[fn,fn], arguments: {length: 0}, outer: global};

//3. both while0 aand while1 have same lexical environment
let whileBlockAtCreationLE2 = {outer: makeArmy};
let whileBlockAtExecutionLE2 = {outer: makeArmy, shooter: fn, j:0};

//3. army0 lexical environment
let army0AtCreationLE2 = {outer: while_0, arguments:{length:0}};
let army0AtExecutionLE2 = {outer: while_0, arguments:{length:0}}; //closure = while_0 , j = 0
