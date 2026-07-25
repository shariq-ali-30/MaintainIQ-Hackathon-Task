let notFoundContiner = document.querySelector(".not-found-container")
let mainContainer = document.querySelector(".container")
let allAssets = JSON.parse(localStorage.getItem("allAssets"))
let paramCode = new URLSearchParams(window.location.search).get("code")
let currentAsset = allAssets.find(asset => asset.code == paramCode)
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
    showToast("success", "Issue reported successfully!")
    updatePage()
}

// Event Listners

submitIssueBtn.addEventListener("click", reportIssue)