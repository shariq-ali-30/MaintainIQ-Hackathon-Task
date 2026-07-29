let totalIssuesCount = document.getElementById("total-issues-count")
let openIssuesCount = document.getElementById("open-issues-count")
let underMaintenanceIssuesCount = document.getElementById("under-maintenance-issues-count")
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
let menuToggleBtn = document.getElementById("menu-toggle-btn")
let menu = document.getElementById("nav-btns")

if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", null)
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"))

if (!currentUser) {
    window.location.href = "/pages/login.html"
}

const allAssetsData = [
    { code: 1001, name: "Classroom Projector 01", location: "Building A - Room 101", status: "Operational", condition: "Excellent", publicPageLink: "https://shariq-maintainiq.vercel.app/public.html?code=1001", history: [{ activity: "Asset Created", time: "July 20, 2026 at 10:00 AM" }] },
    { code: 1002, name: "Facility AC Unit", location: "Building B - Floor 2", status: "Issue Reported", condition: "Fair", publicPageLink: "https://shariq-maintainiq.vercel.app/public.html?code=1002", history: [{ activity: "Asset Created", time: "July 19, 2026 at 02:15 PM" }] },
    { code: 1003, name: "Backup Generator", location: "Utility Area", status: "Under Maintenance", condition: "Poor", publicPageLink: "https://shariq-maintainiq.vercel.app/public.html?code=1003", history: [{ activity: "Asset Created", time: "July 18, 2026 at 08:45 AM" }] },
    { code: 1004, name: "Admin Office Laptop", location: "Admin Office", status: "Operational", condition: "Excellent", publicPageLink: "https://shariq-maintainiq.vercel.app/public.html?code=1004", history: [{ activity: "Asset Created", time: "July 20, 2026 at 01:30 PM" }] },
    { code: 1005, name: "Office Printer", location: "Admin Office", status: "Operational", condition: "Excellent", publicPageLink: "https://shariq-maintainiq.vercel.app/public.html?code=1005", history: [{ activity: "Asset Created", time: "July 17, 2026 at 04:20 PM" }] }
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

if (!localStorage.getItem("allIssues")) {
    localStorage.setItem("allIssues", JSON.stringify(allIssuesData))
}

let allIssues = JSON.parse(localStorage.getItem("allIssues"))

function updatePageDetails() {
    totalIssuesCount.innerText = allIssues.length
    openIssuesCount.innerText = allIssues.filter(issue => issue.status.toLowerCase() == "issue reported").length
    underMaintenanceIssuesCount.innerText = allIssues.filter(issue => issue.status.toLowerCase() == "under maintenance").length
    resolvedIssuesCount.innerText = allIssues.filter(issue => issue.status.toLowerCase() == "resolved" || issue.status.toLowerCase() == "operational").length

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
        tr.innerHTML = `<td class="issue-code">ISS-${issue.id}</td>
                        <td class="asset-name">${issue.assetName}</td>
                        <td class="issue-title">${issue.title}</td>
                        <td class="priority ${issue.priority.toLowerCase()}">
                            <p><span class="dot"></span> ${issue.priority}</p>
                        </td>
                        <td class="status ${issue.status.replace(" ", "-").toLowerCase()}">
                            <p><span class="dot"></span> ${issue.status.replace("Operational", "Resolved")}</p>
                        </td>
                        <td class="reported-date">${issue.date}</td>
                        <td class="action"><button onclick="viewDetails(${issue.id})"><i class="ph ph-eye"></i> View</button></td>`

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
        issue.id.toString().includes(searchInput.value)
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

function viewDetails(issueId) {
    window.location.href = `/pages/issue-details.html?issue-id=${issueId}`
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

menuToggleBtn.addEventListener("click", () => menu.classList.toggle("active"))