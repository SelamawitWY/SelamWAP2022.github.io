/*================== Question one ==========================*/
console.log("======== using object literal =======")
const student = {
  firstName :"",
  lastName : "",
  grades: [],
  inputGrade : function (newGrade){
    this.grades.push(newGrade);
  },
   computeAverageGrade : function (newGrade){
    return  this.grades.reduce((prev, curr, i , arr ) => prev +  curr/ arr.length, 0) ;
  }
}

const stud1 = Object.create(student);
stud1.firstName = 'Selam'; 
stud1.lastName = 'yilma';
stud1.inputGrade(20);
stud1.inputGrade(20);
stud1.inputGrade(20);
const stud2 = Object.create(student);
stud2.firstName = 'Eyeu'; 
stud2.lastName = 'Yilma';
stud2.inputGrade(10);
stud2.inputGrade(10);
const students = [stud1, stud2];

console.log(
  students.reduce((avg, stu, i, array) => avg + stu.computeAverageGrade() / array.length, 0) //16
);

console.log("======== using function constructor =======")

function studentCons(fname,lname, grades) {
	this.firstName =  fname;
    this.lastName = lname;
    this.grades =  grades;
}

studentCons.prototype.inputGrade = function (newGrade){
    this.grades.push(newGrade);
};

studentCons.prototype.computeAverageGrade = function (newGrade){
    return  this.grades.reduce((prev, curr, i , arr ) => prev +  curr/ arr.length, 0) ;
}
      
const stud11 = new studentCons('selam','yilma',[]); 
stud11.inputGrade(20);
stud11.inputGrade(20);
stud11.inputGrade(20);
const stud21 = new studentCons('Endalk','abate',[]);
stud21.inputGrade(10);
stud21.inputGrade(10);
const newStudents = [stud11, stud21];

console.log(
  newStudents.reduce((avg, stu, i, arr) => avg + stu.computeAverageGrade() / arr.length, 0) //15
);

/*================== Question two ==========================*/
let arr= [2,4,3,1];

Array.prototype.mySort= function () {
      
      let arr = this;
      
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] > arr[j]) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }
      
     	return arr;
}

console.log(arr.mySort())

/*================== Question three ==========================*/
//1. === Using object literal

const Linkedlist = {
    list:[],
    add: function(item) {
      this.list.push(item);
    },
    remove: function(item){
      for( var i = 0; i < this.list.length; i++){ 
          if ( this.list[i] === item) { 
              this.list.splice(i, 1); 
          }
      }
    },
    print: function(){
      console.log(`LinkedList {${this.list}}`);
    }
}

let linkedlist1 = Object.create(Linkedlist);

//2. === Using function constructor

function Linkedlist() {
this.list = [];
}
  
Linkedlist.prototype.add = function(item) {
    this.list.push(item);
}

Linkedlist.prototype.remove = function(item){
    for( var i = 0; i < this.list.length; i++){ 
        if ( this.list[i] === item) { 
            this.list.splice(i, 1); 
        }
    }
}

Linkedlist.prototype.print = function(){
console.log(`LinkedList {${this.list}}`);
}

let linkedlist = new Linkedlist();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print(); //Expected Result: LinkedList{1,2,3}; 
linkedlist.remove(2);
linkedlist.print(); //Expected Result: LinkedList{1,3};