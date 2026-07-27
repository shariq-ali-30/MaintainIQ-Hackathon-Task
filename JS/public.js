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
let issueTitleInput = document.querySelector(".issue-title-input")
let issueDescriptionInput = document.querySelector(".issue-description-input")
let submitIssueBtn = document.querySelector(".submit-issue-btn")

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
let paramCode = new URLSearchParams(window.location.search).get("code")
let currentAsset = allAssets.find(asset => asset.code == paramCode)

if (!currentAsset) {
    mainContainer.style.display = "none"
    notFoundContiner.style.display = "flex"
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
    });
}
updatePage()

let errorTimeOut;

function reportIssue() {
    clearTimeout(errorTimeOut)
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

    currentAsset.history.unshift({ activity: `Issue Reported - ${issueTitleInput.value}`, time: timeReported})
    currentAsset.status = "Issue Reported"
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    issueTitleInput.value = ""
    issueDescriptionInput.value = ""
    showToast("success", "Issue reported successfully!")
    updatePage()
}

// Event Listners

submitIssueBtn.addEventListener("click", reportIssue)