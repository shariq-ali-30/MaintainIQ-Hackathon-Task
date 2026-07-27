let totalAssetsCount = document.getElementById("total-assets-count")
let activeIssuesCount = document.getElementById("active-issues-count")
let underMaintenanceCount = document.getElementById("under-maintenance-count")
let assetsDataContainer = document.querySelector(".assets-data-container")
let assetsTableSection = document.querySelector(".asset-table-section")
let modalOverlay = document.querySelector(".modal-overlay")
let openModalBtn = document.querySelector(".add-new-asset-btn")
let cancelBtn = document.querySelector(".cancel-btn")
let addAssetBtn = document.querySelector(".add-asset-btn")
let assetNameInput = document.querySelector(".name-input")
let assetLocationInput = document.querySelector(".location-input")
let toast = document.querySelector(".toast")
let toastIcon = document.getElementById("toast-icon")
let toastMessage = document.querySelector(".toast-message")
let searchInput = document.getElementById("search-input")
let statusDropdown = document.getElementById("status-dropdown")
let locationDropdown = document.getElementById("location-dropdown")
let locationList = document.getElementById("location-list")
let resetToDemoDataBtn = document.querySelector(".reset-to-demo-data-btn")

if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", null)
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"))

if (!currentUser) {
    window.location.href = "pages/login.html"
}

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

if (!localStorage.getItem("assetCodeCount")) {
    localStorage.setItem("assetCodeCount", 1005)
}

let assetCodeCount = localStorage.getItem("assetCodeCount")

let allAssets = JSON.parse(localStorage.getItem("allAssets"))

function updatePageDetails() {
    let locations = [...new Set(allAssets.map(asset => asset.location))].sort().map(loction => {
        let option = document.createElement("option")
        option.value = loction
        option.innerText = loction
        
        return option
    })
    locationDropdown.innerHTML = "<option>All Locations</option>"
    locationList.innerHTML = ""
    locations.forEach(location => {
        locationDropdown.appendChild(location)
        locationList.appendChild(location.cloneNode(true))
    })


    totalAssetsCount.innerText = allAssets.length
    activeIssuesCount.innerText = allAssets.filter(asset => asset.status.toLowerCase() == "issue reported").length
    underMaintenanceCount.innerText = allAssets.filter(asset => asset.status.toLowerCase() == "under maintenance").length

    displayAssets(allAssets)

    if (assetsDataContainer.children.length == 0) {
        assetsTableSection.style.display = "none"
    } else {
        assetsTableSection.style.display = "flex"
    }
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
                        <td class="action"><button onclick="viewDetails(${asset.code})"><i class="ph ph-eye"></i> View</button></td>`

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
    const timeCreated = `${currentDate} at ${currentTime}`

    if (!assetNameInput.value.trim()) {
        assetNameInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            assetNameInput.classList.remove("error")
        }, 3000);
        return showToast("error", "Please enter asset name!")
    }

    if (!assetLocationInput.value.trim()) {
        assetLocationInput.classList.add("error")
        errorTimeout = setTimeout(() => {
            assetLocationInput.classList.remove("error")
        }, 3000);
        return showToast("error", "Please enter asset location!")
    }

    newAssset.code = ++assetCodeCount
    newAssset.name = assetNameInput.value
    newAssset.location = assetLocationInput.value
    newAssset.status = "Operational"
    newAssset.condition = "Excellent"
    newAssset.history = [{ activity: "Asset Created", time: timeCreated }]
    newAssset.publicPageLink = `http://127.0.0.1:5500/pages/public.html?code=${assetCodeCount}`

    allAssets.push(newAssset)

    localStorage.setItem("assetCodeCount", assetCodeCount)
    localStorage.setItem("allAssets", JSON.stringify(allAssets))
    displayAssets(allAssets)
    updatePageDetails()

    closeModal()
    showToast("success", "Asset added successfully!")
    console.log(newAssset);

}

function openModal() {
    modalOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
}

function closeModal() {
    assetNameInput.value = ""
    assetLocationInput.value = ""
    modalOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
}

function searchAssets() {
    if (assetsDataContainer.children.length == 0) {
        showToast("error", "No matching assets found!")
        assetsTableSection.style.display = "none"
    } else {
        assetsTableSection.style.display = "flex"
    }

    if (searchInput.value.length == 0) {
        assetsTableSection.style.display = "flex"
    }

    let filteredAssets = allAssets.filter(asset => asset.name.toLowerCase().includes(searchInput.value.toLowerCase()) || asset.code.toString().includes(searchInput.value))
    displayAssets(filteredAssets)
}

function statusFilter() {
    if (statusDropdown.value.toLowerCase() == "all statuses") {
        displayAssets(allAssets)
        return
    }

    let filteredAssets = allAssets.filter(asset => asset.status.toLowerCase() == statusDropdown.value.toLowerCase())
    displayAssets(filteredAssets)
}

function locationFilter() {
    if (locationDropdown.value.toLowerCase() == "all locations") {
        displayAssets(allAssets)
        return
    }

    let filteredAssets = allAssets.filter(asset => asset.location.toLowerCase() == locationDropdown.value.toLowerCase())
    displayAssets(filteredAssets)
}

function resetToDemoData() {
    localStorage.removeItem("allAssets");
    localStorage.removeItem("assetCodeCount");
    window.location.reload()
}

function viewDetails(assetCode) {
    window.location.href = `pages/details.html?code=${assetCode}`
}

function logOut() {
    
}

// Event Listeners

openModalBtn.addEventListener("click", openModal)

cancelBtn.addEventListener("click", closeModal)

addAssetBtn.addEventListener("click", addNewAsset)

searchInput.addEventListener("input", searchAssets)

statusDropdown.addEventListener("change", statusFilter)

locationDropdown.addEventListener("change", locationFilter)

resetToDemoDataBtn.addEventListener("click", resetToDemoData)