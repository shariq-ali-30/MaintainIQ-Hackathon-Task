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
let viewAssetBtn = document.querySelector(".open-asset-btn")
let timeline = document.querySelector(".timeline")
let notFoundContainer = document.querySelector(".not-found-container")
let mainContainer = document.querySelector(".container")

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

function updatePageDetails() { 
    issueId.innerHTML = `#ISS-${currentIssue.id}`
    issueStatus.innerHTML = `<span class="dot"></span>${currentIssue.status}`
    issueStatus.className = `issue-status ${currentIssue.status.replace(" ", "-").toLowerCase()}`
    issueTitle.innerHTML = currentIssue.title
    issueIdNumber.innerHTML = `ISS-${currentIssue.id}`
    issueReporter.innerHTML = currentIssue.reporterName
    priorityBadge.innerHTML = `<span class="dot"></span> ${currentIssue.priority}`
    priorityBadge.className = `priority-badge ${currentIssue.priority.toLowerCase()}`
    reportedDate.innerHTML = currentIssue.date
    issueDescription.innerHTML = currentIssue.description
    assetName.innerHTML = currentIssue.assetName
    assetCode.innerHTML = `AST-${currentIssue.assetCode}`
    assetLocation.innerHTML = currentIssue.assetLocation
    assetCondition.innerHTML = `<span class="condition ${currentIssue.assetCondition.toLowerCase()}"><span class="dot"></span> ${currentIssue.assetCondition}</span>`
}
updatePageDetails()

// Event Handlers

backBtn.addEventListener("click", () => window.location.href = "/pages/issues.html")