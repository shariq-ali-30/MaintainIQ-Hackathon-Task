let notFoundContiner = document.querySelector(".not-found-container")
let mainContainer = document.querySelector(".container")
let backBtn = document.querySelector(".back-btn")
let allAssets = JSON.parse(localStorage.getItem("allAssets"))
let paramCode = new URLSearchParams(window.location.search).get("code")
let currentAsset = allAssets.find(asset => asset.code == paramCode)
let assetName = document.querySelector(".asset-name")
let assetStatus = document.querySelector(".asset-status")
let assetCode = document.querySelector(".asset-code")
let assetLocation = document.querySelector(".asset-location")
let assetCondition = document.querySelector(".condition")
let assetTimeline = document.querySelector(".timeline")
let modal = document.querySelector(".modal-overlay")
let editBtn = document.querySelector(".edit-btn")
let retireBtn = document.querySelector(".retire-btn")
let saveChangesBtn = document.querySelector(".save-changes-btn")
let closeBtn = document.querySelector(".cancel-btn")
let assetNameInput = document.querySelector(".name-input")
let assetStatusInput = document.querySelector(".status-input")
let assetLocationInput = document.querySelector(".location-input")
let assetConditionInput = document.querySelector(".condition-input")
let retireConfirmBtn = document.querySelector(".retire-confirm-btn")
let retireModalCancelBtn = document.querySelector(".retire-cancel-btn")
let retireModal = document.querySelector(".retire-modal-overlay")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")

backBtn.addEventListener("click", () => window.location.href = "/index.html")


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
    document.title = `${currentAsset.name} | Asset Details - MaintainIQ`
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

function openModal() {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
    assetNameInput.value = currentAsset.name
    assetStatusInput.value = currentAsset.status.toLowerCase()
    assetLocationInput.value = currentAsset.location
    assetConditionInput.value = currentAsset.condition.toLowerCase()
}

function closeModal() {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
    assetNameInput.value = ""
    assetStatusInput.selectedIndex = 0
    assetLocationInput.value = ""
    assetConditionInput.selectedIndex = 0
}

function editAsset() {

    let currentDate = new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    let currentTime = new Date().toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })
    let timeUpdated = `${currentDate} at ${currentTime}`

    let tempHistory = []

    if (currentAsset.name !== assetNameInput.value) {
        tempHistory.unshift(`Name changed to ${assetNameInput.value}`)
    }
    if (currentAsset.status.toLowerCase() !== assetStatusInput.value.toLowerCase()) {
        tempHistory.unshift(`Status updated to ${assetStatusInput.value}`)
    }
    if (currentAsset.location !== assetLocationInput.value) {
        tempHistory.unshift(`Location changed to ${assetLocationInput.value}`)
    }
    if (currentAsset.condition.toLowerCase() !== assetConditionInput.value.toLowerCase()) {
        tempHistory.unshift(`Condition updated to ${assetConditionInput.value}`)
    }

    if (tempHistory.length > 1) {
        tempHistory[0] = "Updated Asset Details"
    }

    currentAsset.name = assetNameInput.value
    currentAsset.status = assetStatusInput.value
    currentAsset.location = assetLocationInput.value
    currentAsset.condition = assetConditionInput.value
    if (tempHistory.length > 0) {
        currentAsset.history.unshift({ activity: tempHistory[0], time: timeUpdated })
        showToast("success", "Asset updated successfully!")
    }
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    closeModal()
    updatePage()
}

function retireAsset() {
    allAssets = allAssets.filter(asset => asset.code !== currentAsset.code)
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    window.location.href = "/index.html"
}

// Event Listners


editBtn.addEventListener("click", openModal)

closeBtn.addEventListener("click", closeModal)

saveChangesBtn.addEventListener("click", editAsset)

retireBtn.addEventListener("click", () => retireModal.classList.add("active"))

retireConfirmBtn.addEventListener("click", () => {
    retireAsset()
    retireModal.classList.remove("active")
})

retireModalCancelBtn.addEventListener("click", () => retireModal.classList.remove("active"))