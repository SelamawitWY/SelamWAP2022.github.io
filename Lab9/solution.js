/* =============   Question 1: using class ===================== */
class LinkedList {

  list = [];
  add(item){
    this.list.push(item);
   }
  remove (item){
     for( var i = 0; i < this.list.length; i++){ 
         if ( this.list[i] === item) { 
             this.list.splice(i, 1); 
         }
     }
   }
   print (){
     console.log(`LinkedList {${this.list}}`);
   }
}

let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print(); //in the console, you should see: LinkedList{1,2,3} 
linkedlist.remove(3);
linkedlist.print(); //in the console, you should see: LinkedList{1,3}

/* =============   Question 2 : Quiz System ===================== */

class Student {
  answers = new Map();
  
  constructor(id){
    this.studentId = id;
  }

  addAnswer(question){
    this.answers.set(question.qid, question.answer);
  }
}

class Question {
   
   constructor(id, answer){
    this.qid = id;
    this.answer = answer;
   }

   checkAnswer(answer) {
     return this.answer == answer;
   }
}

class Quiz {
  constructor(questions, students){
    this.questions = questions;
    this.students = students;
  }

  scoreStudentBySid(sid){
    let score = 0;
    let answers = {};
    this.students.forEach((stud) => {
      if(stud.studentId == sid){
        answers = stud.answers;
      }
    })

    this.questions.forEach((question) => {
      if(answers.get(question.qid) == question.answer) {
         score++;
      }
    });

    return score;
  }

  getAverageScore() {
    return this.students.reduce((avg, curr, i, arr) => {
        avg =  avg + this.scoreStudentBySid(curr.studentId) / this.students.length;
        return avg;
    },0);
  }

}

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

//console.log(student1);
const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));
const students = [student1, student2];
const questions =[
  new Question(1, 'b'), 
  new Question(2, 'a'), 
  new Question(3, 'b')];
const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10); 
console.log(scoreforStudent10); //Expected Result: 3 

let scoreforStudent11 = quiz.scoreStudentBySid(11); 
console.log(scoreforStudent11); //Expected Result: 2

let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5