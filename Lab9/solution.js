/* =============   Question 1: using class ===================== */
class LinkedList {
  add(item) {
    if (this.value === undefined) {
      this.value = item;
      this.next = null; 
    } 
    else {
      let current = this; 
      while (current.next) {
        current = current.next; 
      }

      current.next = { value: item, next: null }; 
    }
  }
  print () {
      let values = [];
      let list = this;

      while(list){
        values.push(list.value);
        list = list.next ;
      }

      console.log(`LinkedList {${values}}`);
    }

  remove(item){
    var list = this;
    let prevItem = null;

    while(list){
      if(list.value == item){
          let itemToRemove = list;
          prevItem.next = itemToRemove.next;
        }
      prevItem = list;
      list =  list.next;
     }
    }
}

let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print(); //in the console, you should see: LinkedList{1,2,3} 
linkedlist.remove(2);
linkedlist.print(); //in the console, you should see: LinkedList{1,3}

/* =============   Question 2 : Quiz System ===================== */

class Student {
  //answers = new Map();
  constructor(id){
    this.studentId = id;
    this.answers = [];
  }

  addAnswer(question){
    // this.answers.set(question.qid, question.answer);
    this.answers.push(question);
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
    this.questions = new Map();
    questions.forEach((q) => this.questions.set(q.qid,  q.answer));
    this.students = students;
  }

  scoreStudentBySid(sid){
    let answers = null;
    
    this.students.forEach((stud) => {
      if(stud.studentId == sid){
        answers = stud.answers;
      }
    });

    return answers.reduce((score, question ,i , arr ) => {
      if(question.checkAnswer(this.questions.get(question.qid))) {
         score++;
      }
      return score;
    },0);
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