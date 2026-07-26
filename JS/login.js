let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let emailInput = document.getElementById("emailInput")
let passwordInput = document.getElementById("passwordInput")
let loginForm = document.querySelector(".login-form")
let eyeIcon = document.getElementById("eye-icon")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")

emailInput.value = "dummyadmin@gmail.com"
passwordInput.value = "dummyadmin123"

if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", null)
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"))

if (currentUser) {
    window.location.href = "/index.html"
}

const users = [
    {
        role: "Admin",
        email: "dummyadmin@gmail.com",
        password: "dummyadmin123"
    }
]

let toastTimeout;
function showToast(state, message) {
    clearTimeout(toastTimeout)

    if (state == "success") {
        toastIcon.className = "fa fa-circle-check"
    }

    if (state == "error") {
        toastIcon.className = "fa fa-circle-xmark"
    }

    toastMessage.innerText = message

    toast.classList.add("active")
    toastTimeout = setTimeout(() => {
        toast.classList.remove("active")
    }, 3000);
}

function toggleEye() {
    if (passwordInput.type == "password"){
        eyeIcon.className = "ph ph-eye-slash"
        passwordInput.type = "text"
    } else {
        eyeIcon.className = "ph ph-eye"
        passwordInput.type = "password"
    }
}

let errorTimeout;
function loginHandler(event) {

    event.preventDefault()

    if (!emailInput.value.trim()) {
        emailInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            emailInput.classList.remove("error")
        }, 3000)
        showToast("error", "Please enter your email!")
        return
    }

    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            emailInput.classList.remove("error")
        }, 3000)
        showToast("error", "Please enter a valid email!")
        return
    }

    if (!passwordInput.value.trim()) {
        passwordInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            passwordInput.classList.remove("error")
        }, 3000)
        showToast("error", "Please enter your password!")
        return
    }

    let user = users.find(user => emailInput.value.trim() == user.email)

    if (!user) {
        showToast("error", "Email not found!")
        emailInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            emailInput.classList.remove("error")
        }, 3000)
        return
    }

    if (emailInput.value.toLowerCase().trim() != user.email) {
        emailInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            emailInput.classList.remove("error")
        }, 3000)
        showToast("error", "Email not found!")
        return
    }
    if (passwordInput.value.trim() != user.password) {
        passwordInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            passwordInput.classList.remove("error")
        }, 3000)
        showToast("error", "Incorrect password!")
        return
    }

    currentUser = user

    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    emailInput.value = ""
    passwordInput.value = ""
    showToast("success", "Login successful!")
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 2000)
}

// Event Listeners

loginForm.addEventListener("submit", loginHandler)

eyeIcon.addEventListener("click", toggleEye)