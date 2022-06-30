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

console.log(arr.constructor === 'Array');

Array.prototype.mySort= function () {
     	return this.sort();
}

console.log(arr.mySort())


