let totalIssuesCount = document.getElementById("total-issues-count")
let openIssuesCount = document.getElementById("open-issues-count")
let inProgressIssuesCount = document.getElementById("in-progress-issues-count")
let resolvedIssuesCount = document.getElementById("resolved-issues-count")
let issuesDataContainer = document.querySelector(".issues-data-container")
let issueTableSection = document.querySelector(".issue-table-section")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")
let searchInput = document.getElementById("search-input")
let statusDropdown = document.getElementById("status-dropdown")
let priorityDropdown = document.getElementById("priority-dropdown")
let resetToDemoDataBtn = document.querySelector(".reset-to-demo-data-btn")
let logOutBtn = document.querySelector(".logout-btn")

if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", null)
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"))

if (!currentUser) {
    window.location.href = "/pages/login.html"
}

const allIssuesData = [
    { code: 1001, assetName: "Classroom Projector 01", title: "Display Flickering", priority: "High", status: "Reported", date: "Jul 20, 2026" },
    { code: 1002, assetName: "Library AC Unit", title: "Water Leakage", priority: "Critical", status: "Maintenance In Progress", date: "Jul 22, 2026" },
    { code: 1003, assetName: "Computer Lab Printer", title: "Paper Jam Error", priority: "Medium", status: "Resolved", date: "Jul 23, 2026" },
    { code: 1004, assetName: "Admin Office Laptop", title: "Battery Not Charging", priority: "High", status: "Inspection Started", date: "Jul 24, 2026" },
    { code: 1005, assetName: "Backup Generator", title: "Not Starting", priority: "Critical", status: "Maintenance In Progress", date: "Jul 24, 2026" }
]

if (!localStorage.getItem("allIssues")) {
    localStorage.setItem("allIssues", JSON.stringify(allIssuesData))
}

let allIssues = JSON.parse(localStorage.getItem("allIssues"))

function updatePageDetails() {
    totalIssuesCount.innerText = allIssues.length
    openIssuesCount.innerText = allIssues.filter(issue => issue.status.toLowerCase() == "reported").length
    inProgressIssuesCount.innerText = allIssues.filter(issue => issue.status.toLowerCase() == "maintenance in progress").length
    resolvedIssuesCount.innerText = allIssues.filter(issue => issue.status.toLowerCase() == "resolved").length

    displayIssues(allIssues)

    if (issuesDataContainer.children.length == 0) {
        issueTableSection.style.display = "none"
    } else {
        issueTableSection.style.display = "flex"
    }
}
updatePageDetails()

function displayIssues(issuesArray) {
    issuesDataContainer.innerHTML = ""
    issuesArray.map(issue => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td class="issue-code">ISS-${issue.code}</td>
                        <td class="asset-name">${issue.assetName}</td>
                        <td class="issue-title">${issue.title}</td>
                        <td class="priority ${issue.priority.toLowerCase()}">
                            <p><span class="dot"></span> ${issue.priority}</p>
                        </td>
                        <td class="status ${issue.status.replace(/\s+/g, "-").toLowerCase()}">
                            <p><span class="dot"></span> ${issue.status}</p>
                        </td>
                        <td class="reported-date">${issue.date}</td>
                        <td class="action"><button onclick="viewDetails(${issue.code})"><i class="ph ph-eye"></i> View</button></td>`

        issuesDataContainer.appendChild(tr)
    })
}
displayIssues(allIssues)

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

function searchIssues() {
    if (issuesDataContainer.children.length == 0) {
        showToast("error", "No matching issues found!")
        issueTableSection.style.display = "none"
    } else {
        issueTableSection.style.display = "flex"
    }

    if (searchInput.value.length == 0) {
        issueTableSection.style.display = "flex"
    }

    let filteredIssues = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchInput.value.toLowerCase()) || 
        issue.assetName.toLowerCase().includes(searchInput.value.toLowerCase()) || 
        issue.code.toString().includes(searchInput.value)
    )
    displayIssues(filteredIssues)
}

function statusFilter() {
    if (statusDropdown.value.toLowerCase() == "all statuses") {
        displayIssues(allIssues)
        return
    }

    let filteredIssues = allIssues.filter(issue => issue.status.toLowerCase() == statusDropdown.value.toLowerCase())
    displayIssues(filteredIssues)
}

function priorityFilter() {
    if (priorityDropdown.value.toLowerCase() == "all priorities") {
        displayIssues(allIssues)
        return
    }

    let filteredIssues = allIssues.filter(issue => issue.priority.toLowerCase() == priorityDropdown.value.toLowerCase())
    displayIssues(filteredIssues)
}

function resetToDemoData() {
    localStorage.removeItem("allIssues");
    localStorage.removeItem("issueCodeCount");
    window.location.reload()
}

function viewDetails(issueCode) {
    window.location.href = `/pages/issue-details.html?code=${issueCode}`
}

function logOut() {
    currentUser = null
    localStorage.setItem("currentUser", currentUser)
    window.location.href = "/pages/login.html"
}

// Event Listeners

searchInput.addEventListener("input", searchIssues)

statusDropdown.addEventListener("change", statusFilter)

priorityDropdown.addEventListener("change", priorityFilter)

resetToDemoDataBtn.addEventListener("click", resetToDemoData)

logOutBtn.addEventListener("click", logOut)