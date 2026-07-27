let roleOptions = document.querySelectorAll(".role-option")
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let emailInput = document.getElementById("emailInput")
let passwordInput = document.getElementById("passwordInput")
let loginForm = document.querySelector(".login-form")
let eyeIcon = document.getElementById("eye-icon")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")

const users = [
    {
        role: "Admin",
        email: "dummyadmin@gmail.com",
        password: "dummyadmin123"
    },
    {
        role: "Technician",
        email: "dummytechnician@gmail.com",
        password: "dummytechnician123"
    }
]

function roleHandler(event) {
    let clickedOption = event.currentTarget

    roleOptions.forEach(option => option.classList.remove("active"))
    clickedOption.classList.add("active")

    if (clickedOption.innerText.toLowerCase() == "admin") {
        emailInput.value = "dummyadmin@gmail.com"
        passwordInput.value = "dummyadmin123"
    }
    if (clickedOption.innerText.toLowerCase() == "technician") {
        emailInput.value = "dummytechnician@gmail.com"
        passwordInput.value = "dummytechnician123"
    }
}

emailInput.value = "dummyadmin@gmail.com"
passwordInput.value = "dummyadmin123"

if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", null)
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"))

if (currentUser) {
    if (currentUser.role.toLowerCase() == "admin") {
        window.location.href = "/index.html"
    }
    if (currentUser.role.toLowerCase() == "technician") {
        window.location.href = "/pages/issues.html"
    }
}

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
    if (passwordInput.type == "password") {
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

    if (currentUser.role.toLowerCase() == "admin") {
        setTimeout(() => {
            window.location.href = "/index.html"
        }, 2000)
    }

    if (currentUser.role.toLowerCase() == "technician") {
        setTimeout(() => {
            window.location.href = "/pages/issues.html"
        }, 2000)
    }

    emailInput.value = ""
    passwordInput.value = ""
    showToast("success", "Login successful!")
}

// Event Listeners

roleOptions.forEach(option => option.addEventListener("click", roleHandler))

loginForm.addEventListener("submit", loginHandler)

eyeIcon.addEventListener("click", toggleEye)
