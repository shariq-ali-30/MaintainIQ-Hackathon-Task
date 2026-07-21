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

function updatePage() {
    document.title = `${currentAsset.name} | Asset Details - MaintainIQ`
    assetName.innerHTML = currentAsset.name
    assetStatus.innerHTML = `<span class="dot"></span> ${currentAsset.status}`
    assetStatus.className = `asset-status ${currentAsset.status.toLowerCase().replace(" ", "-")}`
    assetCode.innerHTML = `AST-${currentAsset.code}`
    assetLocation.innerHTML = currentAsset.location
    assetCondition.innerHTML = `<span class="dot"></span> ${currentAsset.condition}`
    assetCondition.className = `condition ${currentAsset.condition.toLowerCase().replace(" ", "-")}`
    currentAsset.history.forEach(historyItem => {
        assetTimeline.innerHTML = ""
        let div = document.createElement("div")
        div.classList.add("timeline-item")
        div.innerHTML = `<div class="dot">
                            <span></span>
                     </div>
                     <div class="content">
                         <p class="title">${historyItem.activity}</p>
                         <span class="time">${historyItem.time}</span>
                     </div>`
        assetTimeline.insertBefore(div, assetTimeline.firstElementChild)
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
    currentAsset.name = assetNameInput.value
    currentAsset.status = assetStatusInput.value
    currentAsset.location = assetLocationInput.value
    currentAsset.condition = assetConditionInput.value
    closeModal()
    updatePage()
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
}

function retireAsset() {
    allAssets = allAssets.filter(asset => asset.code !== currentAsset.code)
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    window.location.href = "/index.html"
}


// Event Listners

backBtn.addEventListener("click", () => window.location.href = "/index.html")

editBtn.addEventListener("click", openModal)

retireBtn.addEventListener("click", retireAsset)

closeBtn.addEventListener("click", closeModal)

saveChangesBtn.addEventListener("click", editAsset)