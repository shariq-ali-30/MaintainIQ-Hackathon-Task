let totalAssetsCount = document.getElementById("total-assets-count")
let activeIssuesCount = document.getElementById("active-issues-count")
let underMaintenanceCount = document.getElementById("under-maintenance-count")
let assetsDataContainer = document.querySelector(".assets-data-container")
let modalOverlay = document.querySelector(".modal-overlay")
let openModalBtn = document.querySelector(".add-new-asset-btn")
let cancelBtn = document.querySelector(".cancel-btn")
let addAssetBtn = document.querySelector(".add-asset-btn")
let assetName = document.querySelector(".name-input")
let assetLocation = document.querySelector(".location-input")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")

const allAssetsData = [
    { code: 1001, name: "Classroom Projector 01", location: "Building A - Room 101", status: "Operational", condition: "Good" },
    { code: 1002, name: "Facility AC Unit", location: "Building B - Floor 2", status: "Issue Reported", condition: "Fair" },
    { code: 1003, name: "Backup Generator", location: "Utility Area", status: "Under Maintenance", condition: "Poor" },
    { code: 1004, name: "Admin Office Laptop", location: "Admin Office", status: "Operational", condition: "Good" },
    { code: 1005, name: "Office Printer", location: "Admin Office", status: "Operational", condition: "Good" }
]

if (!localStorage.getItem("allAssets")) {
    localStorage.setItem("allAssets", JSON.stringify(allAssetsData))
}

if (!localStorage.getItem("assetCodeCount")) {
    localStorage.setItem("assetCodeCount", 1005)
}

let assetCodeCount = localStorage.getItem("assetCodeCount")

let allAssets = JSON.parse(localStorage.getItem("allAssets"))

function updatePageDetails() {
    totalAssetsCount.innerText = allAssets.length
}
updatePageDetails()

function displayAssets(assetsArray) {
    assetsDataContainer.innerHTML = ""
    assetsArray.map(asset => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td class="asset-code">AST-${asset.code}</td>
                        <td class="asset-name">${asset.name}</td>
                        <td class="location">${asset.location}</td>
                        <td class="status ${asset.status.replace(" ", "-").toLowerCase()}">
                            <p><span class="dot"></span> ${asset.status}</p>
                        </td>
                        <td class="action"><button><i class="ph ph-eye"></i> View</button></td>`

        assetsDataContainer.appendChild(tr)
    })
}
displayAssets(allAssets)

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

let errorTimeout;
function addNewAsset() {
    clearTimeout(errorTimeout)

    let newAssset = {}
    const originalBorderColor = assetName.style.borderColor;

    if (!assetName.value.trim()) {
        assetName.classList.add("error")
        errorTimeout = setTimeout(() => {
            assetName.classList.remove("error")
        }, 3000);
        return showToast("error", "Please enter an asset name!")
    }

    if (assetLocation.selectedIndex == 0) {
        assetLocation.classList.add("error")
        errorTimeout = setTimeout(() => {
            assetLocation.classList.remove("error")
        }, 3000);
        return showToast("error", "Please select a location!")
    }

    newAssset.code = ++assetCodeCount
    newAssset.name = assetName.value
    newAssset.location = assetLocation.value
    newAssset.status = "Operational"
    newAssset.condition = "Good"

    allAssets.push(newAssset)

    localStorage.setItem("assetCodeCount", assetCodeCount)
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    displayAssets(allAssets)

    assetName.value = ""
    assetLocation.selectedInex = 0
    closeModal()
    showToast("success", "Asset added successfully!")
}

function openModal() {
    modalOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
}

function closeModal() {
    assetName.value = ""
    assetLocation.selectedIndex = 0
    modalOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
}

// Event Listeners

openModalBtn.addEventListener("click", openModal)

cancelBtn.addEventListener("click", closeModal)

addAssetBtn.addEventListener("click", () => {
    addNewAsset()
})