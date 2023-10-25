// User Data Base
let userDataBase = []                         

// Set This data base to local storage

let storedUserDataStr = localStorage.getItem('userDataBase');

if(!storedUserDataStr) {
    let userDataJsonString = JSON.stringify([])
    localStorage.setItem( 'userDataBase', userDataJsonString)
}

// Login Works

// Show Password
const showPasses = document.querySelectorAll('#show-pass');
const hidePasses = document.querySelectorAll('#hide-pass');
const passHideShow = document.querySelectorAll('.show-hide-pass');

showPasses.forEach((showPass, index) => {
    showPass.addEventListener('click', () => {
        showPass.style.display = "none";
        hidePasses[index].style.display = "block";
        passHideShow[index].setAttribute("type", "text");
    });
});

hidePasses.forEach((hidePass, index) => {
    hidePass.addEventListener('click', () => {
        hidePass.style.display = "none";
        showPasses[index].style.display = "block";
        passHideShow[index].setAttribute("type", "password");
    });
});



// Needed DOM exces for login
const userID = document.querySelector("#user-id")
const userPassword = document.querySelector("#user-password")
const loginBtn = document.querySelector("#user-login")
const loadinProgress = document.querySelector('.loading')
const bodyOverlay = document.querySelector('.body-overlay')
// Dom exces for go to main page
const maninPage = document.querySelector('.main-page')
const mainPageLoading =  document.querySelector('.loader')


// For Show the loading
function showLoading() {
    loadinProgress.classList.add('show')
}

// For Hide the loading
function hideLoading() {
    loadinProgress.classList.remove('show')
}

// For show overlay
function showOverlay() {
    bodyOverlay.classList.add('show')
}

// For Hide overlay
function hideOverlay() {
    bodyOverlay.classList.remove('show')
}

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

const mainPageCondition = localStorage.getItem('mainPage')

if(mainPageCondition === 'true') {
    maninPage.classList.add('display')
}

// User's name dom exces
const nameOfUser = document.querySelector('.name-of-user');

const storedUserName = localStorage.getItem('userName');

if (storedUserName) {
    nameOfUser.textContent = storedUserName;
}



// For user Login perfectly
function mainLoginStep() {
    // User ID and Password
    let inputedID = parseInt(userID.value);
    let inputedPass = userPassword.value

    let storedUserDataStr = localStorage.getItem('userDataBase');
    let storageUserData = JSON.parse(storedUserDataStr);

    // If Database haven't any data
    if(storageUserData.length === 0) {
        // show loading
        showLoading()
        //show Ovverlay
        showOverlay()
        // Some time later
        setTimeout(() => {
            // Hide Loading
            hideLoading()
            hideOverlay()
            // Alert Message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We can\'t find this user in that information',
            })
        }, 2000)
    }

    // Finding Data from data base
    for(i = 0; i < storageUserData.length; i++) {
        // Cheking for login requerment
        if(storageUserData[i].id === inputedID && inputedPass === storageUserData[i].password) {
            // show loading
            showLoading()
            showOverlay()

            localStorage.setItem('userName', storageUserData[i].firstName)

            nameOfUser.textContent = storageUserData[i].firstName

            // Some time later
            setTimeout(() => {
                // Hide Loading
                hideLoading()
                // Alert Message
                Swal.fire({
                    icon: 'success',
                    title: 'Greate !',
                    text: 'You are successfully loged in',
                })
                // Show main page loading
                mainPageLoading.classList.add('show')
                // Reset the inputs
                makeEmtyLoginInput()

                setTimeout(() => {
                    localStorage.setItem('mainPage', 'true')

                    const ifInMainPage = localStorage.getItem('mainPage') === 'true'
                    
                    if(ifInMainPage) {
                        maninPage.classList.add('display')
                    }

                    setTimeout(() => {
                        hideOverlay()
                        mainPageLoading.classList.remove('show')
                    }, 1000)

                }, 2000)

            }, 2000)

        } else {
            // show loading
            showLoading()
            //show Ovverlay
            showOverlay()
            // Some time later
            setTimeout(() => {
                // Hide Loading
                hideLoading()
                hideOverlay()
                // Alert Message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'We can\'t find this user in that information',
                })
            }, 2000)
        }
    }
}


if(mainPageCondition === 'false') {
    maninPage.classList.remove('display')
}

function makeEmtyLoginInput() {
    userID.value = ""
    userPassword.value = ""
}

// For show scound body or sign up options

// Needed DOM access for sign up
const secondBody = document.querySelector('.scound-body')
const createAccountOption = document.querySelector('#create-account')
const backLogin = document.querySelector('#back-login')
const createAccountBtn = document.querySelector('#sign-up-btn')
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const passUser = document.querySelector('#password-input')

// Empty Sign Up inputs
function emptySignUpInputs() { 
    firstName.value = ""
    lastName.value = ""
    passUser.value = ""
}

// Check if Sign Up exists in local storage
const storedCondition = localStorage.getItem('signUp')

// if the page location in signUp
if (storedCondition === 'true') {
    secondBody.classList.add('show')
}

// When the "create account" button is clicked
createAccountOption.addEventListener('click', () => {
    localStorage.setItem('signUp', 'true') // Set "signUp" to true when the button is clicked

    // Check if the "signUp" condition is "true"
    const signUpCondition = localStorage.getItem('signUp') === 'true'

    if (signUpCondition) {
        setTimeout(() => {
            secondBody.classList.add('show');
        }, 2000)
    }

    showLoading()
    showOverlay()

    setTimeout(() => {
        hideLoading()
        hideOverlay()
        makeEmtyLoginInput()
    }, 2000)

});

// if the page location is not in signUp
if(storedCondition === 'false') {
    secondBody.classList.remove('show')
}

backLogin.addEventListener('click', () => {

    localStorage.setItem('signUp', 'false')

    const signUpConditionFalse = localStorage.getItem('signUp') === 'false'

    if(signUpConditionFalse) {
        setTimeout(() => {
            secondBody.classList.remove('show')
        }, 2000)
    }

    showLoading()
    showOverlay()
    // Back To login
    setTimeout(() => {
        hideLoading()
        hideOverlay()
        emptySignUpInputs()
    }, 2000)
})

// At the click of create account btn
createAccountBtn.addEventListener('click', checkSignUpInputs)

// Regular expression for checking input value
const regExp = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/;

// Cheking the validation of sign up input
function checkSignUpInputs() {
    if(firstName.value === "" || lastName.value === "" || passUser.value === "") {
        // Alert Message
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill out he input field',
        })
    } else if(passUser.value.length < 6) {
        showLoading()
        showOverlay()
        setTimeout(() => {
            hideLoading()
            hideOverlay()
            Swal.fire({
                icon: 'warning',
                title: 'Please...',
                text: 'Provied a password at least 6 character',
            })
        }, 2000)
    } else if (regExp.test(firstName.value) || regExp.test(lastName.value)) {
        showLoading()
        showOverlay()
        setTimeout(() => {
            hideLoading()
            hideOverlay()
            Swal.fire({
                icon: 'warning',
                title: 'Number or Special Crarecter Not supported',
                text: 'Please provied a First Name or Last Name without number or special crarecter',
            })
        }, 2000)
    } else {
        // User Data going to Data Base
        goDataToDataBase()
    }
}

// Does this user already exist
function isUserExist() {
    const userFirstName = firstName.value;
    const userLastName = lastName.value;

    let storedUserDataStr = localStorage.getItem('userDataBase');
    let storageUserData = JSON.parse(storedUserDataStr);

    // Is user exist checking
    for (i = 0; i < storageUserData.length; i++) {
        if (storageUserData[i].firstName === userFirstName && storageUserData[i].lastName === userLastName) {
            showLoading()
            showOverlay()
            setTimeout(() => {
                hideLoading()
                hideOverlay()
                Swal.fire({
                    icon: 'warning',
                    title: 'This user already exists',
                    text: 'Please provide another name; this user already exists.',
                })
            }, 2000)
            return true; // User already exists
        }
    }

    return false; // User does not exist
}

// For going data to data base
function goDataToDataBase() {
    // Get item from local storage
    const userFirstName = firstName.value;
    const userLastName = lastName.value;
    const userPassword = passUser.value;

    let storedUserDataStr = localStorage.getItem('userDataBase');
    let storageUserData = JSON.parse(storedUserDataStr);

    // Is this user's name already exist
    if (isUserExist()) {
        return; // User already exists, don't add again
    }

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

    // Show user's name in DOM

    localStorage.setItem('userName', userFirstName)

    nameOfUser.textContent = userFirstName

    // Success Message
    showLoading()
    showOverlay()

    setTimeout(() => {
        hideLoading()

        Swal.fire({
            title: 'Great',
            text: "Your account is successfully created",
            icon: 'success',
        }).then(() => {
            Swal.fire(
                `${uniqueIdNumber}`,
                'Is your Unique ID. Remember It for Next time Login',
                'info'
            );
        })

        mainPageLoading.classList.add('show')
        setTimeout(() => {
            localStorage.setItem('signUp', 'false')
            localStorage.setItem('mainPage', 'true')
            maninPage.classList.add('display')
            setTimeout(() => {
                hideOverlay()
                mainPageLoading.classList.remove('show')
                secondBody.classList.remove('show')
            })
        }, 2000)

        emptySignUpInputs();
    }, 2000)

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