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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill out he input field',
        })
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
            Swal.fire({
                icon: 'success',
                title: 'Greate !',
                text: 'You are successfully loged in',
            })
        } else if (userDataBase[i].id !== inputedID) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your User ID is Wrong',
            })
        } else if (userDataBase[i].password !== inputedPass) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Password is incorrect',
            })
        }
    }
}

// For show scound body or sign up options

const scoundBody = document.querySelector('.scound-body')
const createAccountOption = document.querySelector('#create-account')
const backLogin = document.querySelector('#back-login')

createAccountOption.addEventListener('click', () => {
    scoundBody.classList.add('show')
})

backLogin.addEventListener('click', () => {
    scoundBody.classList.remove('show')
})

