let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")
let backBtn = document.querySelector(".back-btn")
let issueId = document.querySelector(".issue-id")
let issueStatus = document.querySelector(".issue-status")
let issueTitle = document.querySelector(".issue-title-text")
let issueIdNumber = document.querySelector(".issue-id-number")
let issueReporter = document.querySelector(".reporter-name")
let priorityBadge = document.querySelector(".priority-badge")
let reportedDate = document.querySelector(".reported-date")
let issueDescription = document.querySelector(".description-text")
let assetName = document.querySelector(".asset-name")
let assetCode = document.querySelector(".asset-code")
let assetLocation = document.querySelector(".asset-location")
let assetCondition = document.querySelector(".asset-condition")
let assetTimeline = document.querySelector(".timeline")
let notFoundContainer = document.querySelector(".not-found-container")
let mainContainer = document.querySelector(".container")
let startMaintenanceBtn = document.querySelector(".start-maintenance-btn")
let resolveIssueBtn = document.querySelector(".resolve-btn")

if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", null)
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"))

if (!currentUser) {
    window.location.href = "/pages/login.html"
}

let allIssues = JSON.parse(localStorage.getItem("allIssues"))
let issueIdParam = new URLSearchParams(window.location.search).get("issue-id")
let currentIssue = allIssues.find(issue => issue.id == issueIdParam)

if (!currentIssue) {
    notFoundContainer.style.display = "flex"
    mainContainer.style.display = "none"
}

const allIssuesData = [
  { id: 1001, issueIdNumber: 1001, title: "Display Flickering", description: "Projector screen starts flickering after 15 minutes of continuous use.", status: "Resolved", priority: "High", reporterName: "Ali Raza", date: "Jul 20, 2026", assetCode: 1001, assetName: "Classroom Projector 01" },
  { id: 1002, issueIdNumber: 1002, title: "Water Leakage", description: "Water dripping directly over the study table area from the split unit.", status: "Issue Reported", priority: "Critical", reporterName: "Sara Khan", date: "Jul 22, 2026", assetCode: 1002, assetName: "Facility AC Unit" },
  { id: 1003, issueIdNumber: 1003, title: "Not Starting", description: "Automatic takeover failed during power outage. Battery voltage low.", status: "Under Maintenance", priority: "Critical", reporterName: "Tariq Mahmood", date: "Jul 24, 2026", assetCode: 1003, assetName: "Backup Generator" },
  { id: 1004, issueIdNumber: 1004, title: "Battery Not Charging", description: "Laptop is not holding charge and powers off instantly when unplugged.", status: "Resolved", priority: "High", reporterName: "Bilal Sheikh", date: "Jul 24, 2026", assetCode: 1004, assetName: "Admin Office Laptop" },
  { id: 1005, issueIdNumber: 1005, title: "Paper Jam Error", description: "Roller mechanism stuck, showing persistent paper jam error on panel.", status: "Resolved", priority: "Medium", reporterName: "Usman Ahmed", date: "Jul 23, 2026", assetCode: 1005, assetName: "Office Printer" }
]

const allAssetsData = [
    { code: 1001, name: "Classroom Projector 01", location: "Building A - Room 101", status: "Operational", condition: "Excellent", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1001", history: [{ activity: "Asset Created", time: "July 20, 2026 at 10:00 AM" }] },
    { code: 1002, name: "Facility AC Unit", location: "Building B - Floor 2", status: "Issue Reported", condition: "Fair", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1002", history: [{ activity: "Asset Created", time: "July 19, 2026 at 02:15 PM" }] },
    { code: 1003, name: "Backup Generator", location: "Utility Area", status: "Under Maintenance", condition: "Poor", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1003", history: [{ activity: "Asset Created", time: "July 18, 2026 at 08:45 AM" }] },
    { code: 1004, name: "Admin Office Laptop", location: "Admin Office", status: "Operational", condition: "Excellent", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1004", history: [{ activity: "Asset Created", time: "July 20, 2026 at 01:30 PM" }] },
    { code: 1005, name: "Office Printer", location: "Admin Office", status: "Operational", condition: "Excellent", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1005", history: [{ activity: "Asset Created", time: "July 17, 2026 at 04:20 PM" }] }
]

if (!localStorage.getItem("allAssets")) {
    localStorage.setItem("allAssets", JSON.stringify(allAssetsData))
}

let allAssets = JSON.parse(localStorage.getItem("allAssets"))
let currentAsset = allAssets.find(asset => asset.code == currentIssue.assetCode)

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

function updatePageDetails() {
    issueId.innerHTML = `#ISS-${currentIssue.id}`
    issueStatus.innerHTML = `<span class="dot"></span>${currentAsset.status.replace("Operational", "Resolved")}`
    issueStatus.className = `issue-status ${currentAsset.status.replace(" ", "-").toLowerCase()}`
    issueTitle.innerHTML = currentIssue.title
    issueIdNumber.innerHTML = `ISS-${currentIssue.id}`
    issueReporter.innerHTML = currentIssue.reporterName
    priorityBadge.innerHTML = `<span class="dot"></span> ${currentIssue.priority}`
    priorityBadge.className = `priority-badge ${currentIssue.priority.toLowerCase()}`
    reportedDate.innerHTML = currentIssue.date
    issueDescription.innerHTML = currentIssue.description
    assetName.innerHTML = currentAsset.name
    assetCode.innerHTML = `AST-${currentAsset.code}`
    assetLocation.innerHTML = currentAsset.location
    assetCondition.innerHTML = `<span class="condition ${currentAsset.condition.toLowerCase()}"><span class="dot"></span> ${currentAsset.condition}</span>`
    assetTimeline.innerHTML = ""
    currentAsset.history.forEach(historyItem => {
        let div = document.createElement("div")
        div.classList.add("timeline-item")
        div.innerHTML = `<div class="dot">
                            <span></span>
                        </div>
                        <div class="content">
                            <p class="title">${historyItem.activity}</p>
                            <span class="time">${historyItem.time}</span>
                        </div>`
        assetTimeline.appendChild(div)
    });
}
updatePageDetails()

function startMaintenance() {

    let currentDate = new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
    let currentTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
    const timeStarted = `${currentDate} at ${currentTime}`

    if (currentAsset.status.toLowerCase() == "under maintenance") {
        showToast("error", "Issue is already in Under Maintenance!")
        return
    }

    if (currentAsset.status.toLowerCase() == "operational") {
        showToast("error", "Issue is already Resolved!")
        return
    }

    currentAsset.status = "Under Maintenance"
    currentAsset.history.unshift({ activity: `Maintenance Started - ${currentIssue.title}`, time : timeStarted })
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    
    updatePageDetails()
}

function resolveIssue() {
    
    let currentDate = new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
    let currentTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
    const timeResolved = `${currentDate} at ${currentTime}`

    if (currentAsset.status.toLowerCase() == "operational") {
        showToast("error", "Issue is already Reolved!")
        return
    }

    currentAsset.status = "Operational"
    currentAsset.history.unshift({ activity: `Issue Resolved - ${currentIssue.title}`, time : timeResolved })
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    
    updatePageDetails()
}

// Event Handlers

backBtn.addEventListener("click", () => window.location.href = "/pages/issues.html")

startMaintenanceBtn.addEventListener("click", startMaintenance)

resolveIssueBtn.addEventListener("click", resolveIssue)