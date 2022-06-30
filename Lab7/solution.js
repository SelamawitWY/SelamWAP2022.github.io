//Question 1: ===========================================================

function askPassword(ok, fail){
    let password = prompt("Password ?" ,'');
    if(password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',
    loginOk(){
        alert(`${this.name} logged in`);
    },
    loginFail(){
        alert(`${this.name} failed to log in`);
    },
}

// Solution 1: wrapper
askPassword( () => user.loginOk(), () => user.loginFail());

// Solution 2:  Bind
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

//Solution 3: Call
askPassword( () => user.loginOk.call(user), () => user.loginFail.call(user));

//Solution 3: Apply
askPassword( () => user.loginOk.apply(user), () => user.loginFail.apply(user));


//Question 2: ===========================================================
// ========== option one == bind
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
     this.students.forEach( function(student) {
				console.log(this.title + ": " + student );
    	}.bind(this));
  	}
  }

 group.showList();

 // ========= option two 

 let group2 = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
      //change regular function called inside forEach to arrow function
      this.students.forEach( (student) => console.log(this.title + ": " + student) );
    },
  };

  group2.showList();

  // ======== option three

  let group3 = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
     this.students.forEach(function(student) {
				console.log(this.title + ": " + student );
    	},this);
  	}
  }

  group3.showList();

  // ======= option four = call
  let group4 = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
     this.students.forEach( (student) => function() {
				console.log(this.title + ": " + student );
    	}.call(this));
  	}
  }

  group4.showList();

