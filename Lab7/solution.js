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

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
      //change regular function called inside forEach to arrow function
      this.students.forEach( (student) => console.log(this.title + ": " + student) );
    },
  };

  group.showList();