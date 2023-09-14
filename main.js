// User Data Base
let userDataBase = [
    {
        id: 23456,
        password: "rifat.17",
        firstName: "Rubayat",
        lastName: "Rifat"
    }
]                         

// Set This data base to local storage
let userDataJsonString = JSON.stringify(userDataBase)

localStorage.setItem( 'userDataBase', userDataJsonString)

// Login Works

// Needed DOM exces for login
const userID = document.querySelector("#user-id")
const userPassword = document.querySelector("#user-password")
const loginBtn = document.querySelector("#user-login")

// At the click of login btn
loginBtn.addEventListener('click', chekLoginInputs)

// Cheking validation of input
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

// For user Login perfectly
function mainLoginStep() {
    // User ID and Password
    let inputedID = parseInt(userID.value);
    let inputedPass = userPassword.value

    let storedUserDataStr = localStorage.getItem('userDataBase');
    let storageUserData = JSON.parse(storedUserDataStr);

    // Finding Data from data base
    for(i = 0; i < storageUserData.length; i++) {
        // Cheking for login requerment
        if(storageUserData[i].id === inputedID && inputedPass === storageUserData[i].password) {
            // Alert Message
            Swal.fire({
                icon: 'success',
                title: 'Greate !',
                text: 'You are successfully loged in',
            })
            makeEmtyLoginInput()
        } else if (storageUserData[i].id !== inputedID || storageUserData[i].password !== inputedPass) {
            // Alert Message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Somethin went wrong',
            })
        }
    }
}

function makeEmtyLoginInput() {
    userID.value = ""
    userPassword.value = ""
}

// For show scound body or sign up options

// Needed DOM exces for sign up
const scoundBody = document.querySelector('.scound-body')
const createAccountOption = document.querySelector('#create-account')
const backLogin = document.querySelector('#back-login')
const createAccountBtn = document.querySelector('#sign-up-btn')
const firstName =  document.querySelector('#first-name')
const lastName =  document.querySelector('#last-name')
const passUser = document.querySelector('#password-input')
const loadinProgress = document.querySelector('.loading')

// Emty Sing Up inputs
function emtySignUpInpus() {
    firstName.value = ""
    lastName.value = ""
    passUser.value = ""
}

// For Show the loading
function showLoading() {
    loadinProgress.classList.add('show')
}

// For Hide the loading
function hideLoading() {
    loadinProgress.classList.remove('show')
}

// What will done when user click on create account
createAccountOption.addEventListener('click', () => {
    showLoading()
    // Go to sign up part with loading
    setTimeout(() => {
        scoundBody.classList.add('show')
        hideLoading()
        makeEmtyLoginInput()
    }, 2000)
})


backLogin.addEventListener('click', () => {
    showLoading()
    // Back To login
    setTimeout(() => {
        scoundBody.classList.remove('show')
        hideLoading()
        emtySignUpInpus()
    }, 2000)
})

// At the click of create account btn
createAccountBtn.addEventListener('click', chekSignUpInputs)

// Cheking the validation of sign up input
function chekSignUpInputs() {
    if(firstName.value === "" || lastName.value === "" || passUser.value === "") {
        // Alert Message
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill out he input field',
        })
    } else {
        // User Data going to Data Base
        goDataToDataBase()
    }
}

// For going data to data base
function goDataToDataBase() {
    // Get item form local storage

    const userFirstName = firstName.value;
    const userLastName = lastName.value;
    const userPassword = passUser.value;

    let storedUserDataStr = localStorage.getItem('userDataBase');
    let storageUserData = JSON.parse(storedUserDataStr);


    // Creating User unique id number
    const uniqueIdNumber = generateUniqueRandomNumber();

    // New User Data
    let newUserData = { id: uniqueIdNumber, password: userPassword, firstName: userFirstName, lastName: userLastName };

    // Adding Data to data base
    storageUserData.push(newUserData);

    // Convert the modified array back to a JSON string
    let updatedJsonString = JSON.stringify(storageUserData);

    // Update the array of user data in local storage
    
    localStorage.setItem('userDataBase', updatedJsonString);

    // Success Message
    Swal.fire({
        title: 'Great',
        text: "Your account is successfully created",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                `${uniqueIdNumber}`,
                'Is your Unique ID. Remember It for Next time Login',
                'info'
            )
        }
    });

    emtySignUpInpus();
}


// For genarate users unique id number
function generateUniqueRandomNumber() {
    const usedNumbers = new Set();
    let randomNumber;
  
    do {
      randomNumber = Math.floor(Math.random() * 90000) + 10000;
    } while (usedNumbers.has(randomNumber));
  
    usedNumbers.add(randomNumber);
    return randomNumber;
}