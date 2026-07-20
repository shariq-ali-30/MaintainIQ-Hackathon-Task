let allAssets = JSON.parse(localStorage.getItem("allAssets"))
let paramCode = new URLSearchParams(window.location.search).get("code")
let currentAsset = allAssets.find(asset => asset.code == paramCode)
let assetName = document.querySelector(".asset-name")
let assetStatus = document.querySelector(".asset-status")
let assetCode = document.querySelector(".asset-code")
let assetLocation = document.querySelector(".asset-location")
let assetCondition = document.querySelector(".condition")
let assetTimeline = document.querySelector(".timeline")

assetName.innerHTML = currentAsset.name
assetStatus.innerHTML = `<span class="dot"></span> ${currentAsset.status}`
assetStatus.className = `asset-status ${currentAsset.status.toLowerCase().replace(" ", "-")}`
assetCode.innerHTML = `AST-${currentAsset.code}`
assetLocation.innerHTML = currentAsset.location
assetCondition.innerHTML = `<span class="dot"></span> ${currentAsset.condition}`
assetCondition.className = `condition ${currentAsset.condition.toLowerCase().replace(" ", "-")}`
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