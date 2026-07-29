let notFoundContiner = document.querySelector(".not-found-container")
let mainContainer = document.querySelector(".container")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")
let assetName = document.querySelector(".asset-name")
let assetStatus = document.querySelector(".asset-status")
let assetCode = document.querySelector(".asset-code")
let assetLocation = document.querySelector(".asset-location")
let assetCondition = document.querySelector(".condition")
let assetTimeline = document.querySelector(".timeline")
let reporterNameInput = document.querySelector(".reporter-name-input")
let issuePriorityInput = document.querySelector(".priority-input")
let issueTitleInput = document.querySelector(".issue-title-input")
let issueDescriptionInput = document.querySelector(".issue-description-input")
let submitBtn = document.querySelector(".submit-btn")

const allAssetsData = [
    { code: 1001, name: "Classroom Projector 01", location: "Building A - Room 101", status: "Operational", condition: "Excellent", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1001", history: [{ activity: "Asset Created", time: "July 20, 2026 at 10:00 AM" }] },
    { code: 1002, name: "Facility AC Unit", location: "Building B - Floor 2", status: "Issue Reported", condition: "Fair", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1002", history: [{ activity: "Asset Created", time: "July 19, 2026 at 02:15 PM" }] },
    { code: 1003, name: "Backup Generator", location: "Utility Area", status: "Under Maintenance", condition: "Poor", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1003", history: [{ activity: "Asset Created", time: "July 18, 2026 at 08:45 AM" }] },
    { code: 1004, name: "Admin Office Laptop", location: "Admin Office", status: "Operational", condition: "Excellent", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1004", history: [{ activity: "Asset Created", time: "July 20, 2026 at 01:30 PM" }] },
    { code: 1005, name: "Office Printer", location: "Admin Office", status: "Operational", condition: "Excellent", publicPageLink: "http://127.0.0.1:5500/pages/public.html?code=1005", history: [{ activity: "Asset Created", time: "July 17, 2026 at 04:20 PM" }] }
]

const allIssuesData = [
  { id: 1001, issueIdNumber: 1001, title: "Display Flickering", description: "Projector screen starts flickering after 15 minutes of continuous use.", status: "Resolved", priority: "High", reporterName: "Ali Raza", date: "Jul 20, 2026", assetCode: 1001, assetName: "Classroom Projector 01" },
  { id: 1002, issueIdNumber: 1002, title: "Water Leakage", description: "Water dripping directly over the study table area from the split unit.", status: "Issue Reported", priority: "Critical", reporterName: "Sara Khan", date: "Jul 22, 2026", assetCode: 1002, assetName: "Facility AC Unit" },
  { id: 1003, issueIdNumber: 1003, title: "Not Starting", description: "Automatic takeover failed during power outage. Battery voltage low.", status: "Under Maintenance", priority: "Critical", reporterName: "Tariq Mahmood", date: "Jul 24, 2026", assetCode: 1003, assetName: "Backup Generator" },
  { id: 1004, issueIdNumber: 1004, title: "Battery Not Charging", description: "Laptop is not holding charge and powers off instantly when unplugged.", status: "Resolved", priority: "High", reporterName: "Bilal Sheikh", date: "Jul 24, 2026", assetCode: 1004, assetName: "Admin Office Laptop" },
  { id: 1005, issueIdNumber: 1005, title: "Paper Jam Error", description: "Roller mechanism stuck, showing persistent paper jam error on panel.", status: "Resolved", priority: "Medium", reporterName: "Usman Ahmed", date: "Jul 23, 2026", assetCode: 1005, assetName: "Office Printer" }
]

if (!localStorage.getItem("allAssets")) {
    localStorage.setItem("allAssets", JSON.stringify(allAssetsData))
}

let allAssets = JSON.parse(localStorage.getItem("allAssets"))
let paramCode = new URLSearchParams(window.location.search).get("code")
let currentAsset = allAssets.find(asset => asset.code == paramCode)

if (!currentAsset) {
    mainContainer.style.display = "none"
    notFoundContiner.style.display = "flex"
}

if (!localStorage.getItem("allIssues")) {
    localStorage.setItem("allIssues", JSON.stringify(allIssuesData))
}

if (!localStorage.getItem("issueCodeCount")) {
    localStorage.setItem("issueCodeCount", 1005)
}

let allIssues = JSON.parse(localStorage.getItem("allIssues"))

let issueCodeCount = localStorage.getItem("issueCodeCount")

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

function updatePage() {
    document.title = `${currentAsset.name} | Asset Details (Public) - MaintainIQ`
    assetName.innerHTML = currentAsset.name
    assetStatus.innerHTML = `<span class="dot"></span> ${currentAsset.status}`
    assetStatus.className = `asset-status ${currentAsset.status.toLowerCase().replace(" ", "-")}`
    assetCode.innerHTML = `AST-${currentAsset.code}`
    assetLocation.innerHTML = currentAsset.location
    assetCondition.innerHTML = `<span class="dot"></span> ${currentAsset.condition}`
    assetCondition.className = `condition ${currentAsset.condition.toLowerCase().replace(" ", "-")}`
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
    })
}
updatePage()

let errorTimeOut;

function reportIssue() {
    
    clearTimeout(errorTimeOut)
    if (!reporterNameInput.value.trim()) {
        showToast("error", "Please enter your name!")
        reporterNameInput.classList.add("error")
        errorTimeOut = setTimeout(() => {
            reporterNameInput.classList.remove("error")
        }, 3000);
        return
    }
    if (!issueTitleInput.value.trim()) {
        showToast("error", "Please enter a title for the issue!")
        issueTitleInput.classList.add("error")
        errorTimeOut = setTimeout(() => {
            issueTitleInput.classList.remove("error")
        }, 3000);
        return
    }
    if (!issueDescriptionInput.value.trim()) {
        showToast("error", "Please enter a description for the issue!")
        issueDescriptionInput.classList.add("error")
        errorTimeOut = setTimeout(() => {
            issueDescriptionInput.classList.remove("error")
        }, 3000);
        return
    }

    let currentDate = new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    let currentTime = new Date().toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })
    let timeReported = `${currentDate} at ${currentTime}`


    let newIssue = {}

    currentAsset.history.unshift({ activity: `Issue Reported - ${issueTitleInput.value}`, time: timeReported})
    currentAsset.status = "Issue Reported"
    localStorage.setItem("allAssets", JSON.stringify(allAssets))

    issueCodeCount = ++issueCodeCount


    newIssue.id = issueCodeCount
    newIssue.status = currentAsset.status
    newIssue.title = issueTitleInput.value.trim()
    newIssue.issueIdNumber = issueCodeCount
    newIssue.reporterName = reporterNameInput.value.trim()
    newIssue.priority = issuePriorityInput.value
    newIssue.date = currentDate
    newIssue.description = issueDescriptionInput.value.trim()
    newIssue.assetName = currentAsset.name
    newIssue.assetCode = currentAsset.code

    allIssues.push(newIssue)

    localStorage.setItem("allIssues", JSON.stringify(allIssues))


    reporterNameInput.value = ""
    issuePriorityInput.selectedIndex = 0
    issueTitleInput.value = ""
    issueDescriptionInput.value = ""
    showToast("success", "Issue reported successfully!")
    updatePage()
}

// Event Listners

submitBtn.addEventListener("click", reportIssue)