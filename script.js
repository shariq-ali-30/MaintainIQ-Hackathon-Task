let assetsDataContainer = document.querySelector(".assets-data-container")

const allAssetsData = [
    { code: "AST-1001", name: "Classroom Projector 01", location: "Building A - Room 101", status: "Operational", condition: "Good" },
    { code: "AST-1002", name: "Facility AC Unit", location: "Building B - Floor 2", status: "Issue Reported", condition: "Fair" },
    { code: "AST-1003", name: "Backup Generator", location: "Utility Area", status: "Under Maintenance", condition: "Poor" },
    { code: "AST-1004", name: "Admin Office Laptop", location: "Admin Office", status: "Operational", condition: "Good" },
    { code: "AST-1005", name: "Office Printer", location: "Admin Office", status: "Operational", condition: "Good" }
]

if (!localStorage.getItem("allAssets")) {
    localStorage.setItem("allAssets", JSON.stringify(allAssetsData))
}

let allAssets = JSON.parse(localStorage.getItem("allAssets"))

function displayAssets(assetsArray) {
    assetsArray.map(asset => {        
        let tr = document.createElement("tr")
        tr.innerHTML = `<td class="asset-code">${asset.code}</td>
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