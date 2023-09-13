// User Data Base
let userDataBase = [
    {
        id: 23456,
        password: "rifat.17",
        firstName: "Rubayat",
        lastName: "Rifat"
    }
]                                                                           

// Login Works
const userID = document.querySelector("#user-id")
const userPassword = document.querySelector("#user-password")
const loginBtn = document.querySelector("#user-login")


loginBtn.addEventListener('click', chekLoginInputs)

function chekLoginInputs() {
    if(userID.value === "" || userPassword.value === "") {
        alert("Please Fillout the input fields")
    } else {
        mainLoginStep()
        return
    }
}

function mainLoginStep() {
    let inputedID = parseInt(userID.value);
    let inputedPass = userPassword.value

    // Finding Data
    for(i = 0; i < userDataBase.length; i++) {
        if(userDataBase[i].id === inputedID && inputedPass === userDataBase[i].password) {
            alert("Your are Successfully Loged in")
        } else if (userDataBase[i].id !== inputedID) {
            alert("You are giveing a wrong ID")
        } else if (userDataBase[i].password !== inputedPass) {
            alert("Your Password is incorrect")
        }
    }
}
