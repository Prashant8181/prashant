//let rowCount = 0;

// 🔥 PARTICULAR DATA
let particularData = [

    {
        category: "Common Service & Maintenance Parts",
        items: [
            "Service","Engine Oil", "Gear Box Oil", "Brake Oil",
            "Oil Filter", "Air Filter", "Fuel Filter",
            "Spark Plug", "Chain Lubricant", "Chain Adjustment",
            "Coolant", "Greasing", "General Service Labour"
        ]
    },

    {
        category: "Engine & Internal Components",
        items: [
            "Block Piston", "Piston Rings", "Connecting Rod",
            "Crankshaft", "Crank Bearing", "Engine Bearing Kit",
            "Camshaft", "Timing Chain", "Timing Chain Kit",
            "Valve", "Valve Guide", "Valve Seal",
            "Valve Lapping", "Head Packing", "Full Packing Set",
            "Oil Pump", "Rocker Arm", "Rocker",
            "Engine Valve", "Engine Overhaul Labour"
        ]
    },

    {
        category: "Clutch & Transmission",
        items: [
            "Clutch Plate", "Clutch Friction Plate",
            "Pressure Plate", "Clutch Cable",
            "Clutch Bearing", "Clutch Bell",
            "Clutch Housing", "Clutch Labour"
        ]
    },

    {
        category: "Gear Box & CVT",
        items: [
            "Gear Box", "Gear Box Bearing",
            "Gear Box Packing", "Gear Box Labour",
            "CVT Belt", "Roller", "Weight Roller"
        ]
    },

    {
        category: "Brake & Suspension",
        items: [
            "Brake Pad", "Brake Shoes",
            "Brake Lever", "Brake Cable",
            "Rear Damper", "Front Suspension",
            "Bushes"
        ]
    },

    {
        category: "Electrical & Battery",
        items: [
            "Battery", "Battery Charging",
            "Starter Relay", "Self Starter",
            "Wiring", "Horn", "Indicator",
            "Headlight", "Tail Light"
        ]
    },

    {
        category: "Body, Outer & Misc Parts",
        items: [
            "Seat Cover", "Mudguard", "Side Mirror",
            "Visor", "Tail Panel", "Stand",
            "Lock Set", "Speedometer Cable",
            "Accelerator Cable", "Petrol Pipe",
            "Bolt", "Nut", "Washer"
        ]
    },

    {
        category: "Fuel System",
        items: [
            "Carburettor", "Fuel Pump",
            "Petrol Filter", "Fuel Injector",
            "Fuel Line"
        ]
    },

    {
        category: "Labour & Repair Work",
        items: [
            "General Labour", "Engine Repair",
            "Clutch Repair", "Brake Service",
            "Full Service", "Washing",
            "Denting Painting", "Welding"
        ]
    }

];


// ===============================

// 🚀 PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    // 👉 TODAY DATE SET
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');

    let todayStr = `${yyyy}-${mm}-${dd}`;
    document.getElementById("date").value = todayStr;

    // 👉 NEXT SERVICE AUTO
    setNextServiceDate(todayStr);

    // 👉 RANDOM BILL NUMBER (as you wanted)
    let random = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("billNo").value = `${yyyy}${mm}${dd}-${random}`;
});

// ===============================
// 📅 NEXT SERVICE DATE
// ===============================
function setNextServiceDate(dateValue){
    let selected = new Date(dateValue);
    selected.setMonth(selected.getMonth() + 3);

    let yyyy = selected.getFullYear();
    let mm = String(selected.getMonth() + 1).padStart(2, '0');
    let dd = String(selected.getDate()).padStart(2, '0');

    document.getElementById("nextservicedate").value = `${yyyy}-${mm}-${dd}`;
}

// 👉 date change event FIX (must be inside DOMContentLoaded OR after HTML)
setTimeout(() => {
    let dateInput = document.getElementById("date");
    if(dateInput){
        dateInput.addEventListener("change", function () {
            setNextServiceDate(this.value);
        });
    }
}, 500);

// ===============================
// 📊 DASHBOARD
// ===============================
function loadDashboard() {

    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    let today = new Date().toISOString().split("T")[0];

    let todayBills = bills.filter(b => b.date === today);

    document.getElementById("todayCount").innerText = todayBills.length;
    document.getElementById("totalBills").innerText = bills.length;

    document.getElementById("lastCustomer").innerText =
        bills.length > 0 ? bills[bills.length - 1].name : "-";

    let amount = todayBills.reduce((sum, b) => sum + Number(b.total || 0), 0);
    document.getElementById("todayAmount").innerText = "₹" + amount;
}
//BIKE DATA
let bikeData = {
    Honda: [
        "Activa" , "Activa 3G","Activa 4G","Avtiva 5G","Activa 6G", "Activa 125", "Dio",
        "Shine 100", "Shine 125", "SP 125",
        "Unicorn", "Hornet 2.0", "CB200X",
        "Hness CB350", "CB350RS"
    ],
    TVS: [
        "Jupiter", "Ntorq 125", "Sport",
        "Star City Plus", "Raider 125",
        "Apache RTR 160", "Apache RTR 180",
        "Apache RTR 200", "Apache RR 310",
        "Ronin", "iQube"
    ],
    Suzuki: [
        "Access 125", "Burgman Street", "Avenis",
        "Gixxer", "Gixxer SF", "V-Strom SX"
    ],
    Bajaj: [
        "Platina 100", "Platina 110", "CT 110",
        "Pulsar 125", "Pulsar 150", "Pulsar 180",
        "Pulsar 220F", "Pulsar N160", "Pulsar N250",
        "Pulsar NS200", "Avenger Street", "Avenger Cruise",
        "Dominar 250", "Dominar 400", "Chetak"
    ],
    Hero: [
        "Splendor Plus", "HF Deluxe", "Passion Pro",
        "Glamour", "Super Splendor",
        "Xtreme 160R", "Xtreme 200S",
        "XPulse 200", "Xoom", "Destini 125", "Vida V1"
    ],
    Yamaha: [
        "Fascino 125", "Ray ZR 125", "Aerox 155",
        "FZ", "FZ-S", "FZ-X",
        "MT-15", "R15 V4", "R15S"
    ]
};

// ===============================
// 🚗 BRAND → MODEL FIX
// ===============================
function loadModels() {

    let brand = document.getElementById("brand").value;
    let modelDropdown = document.getElementById("model");

    modelDropdown.innerHTML = "<option value=''>Select Model</option>";

    if (!brand || !bikeData[brand]) return;

    bikeData[brand].forEach(function(model){
        let option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelDropdown.appendChild(option);
    });
}

// ===============================
// 🧾 NOTICE
// ===============================
function saveNotice() {

    let text = document.getElementById("noticeText").value.trim();

    if (text === "") {
        alert("Write something!");
        return;
    }

    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.push(text);

    localStorage.setItem("notices", JSON.stringify(notices));
    document.getElementById("noticeText").value = "";

    loadNotice();
}

function loadNotice() {

    let list = document.getElementById("noticeList");
    list.innerHTML = "";

    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    notices.forEach((n, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            <span>✔ ${n}</span>
            <button onclick="deleteNotice(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

function deleteNotice(index) {

    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.splice(index, 1);

    localStorage.setItem("notices", JSON.stringify(notices));
    loadNotice();
}

function clearNotice() {
    document.getElementById("noticeText").value = "";
}

// ===============================
// 💾 SAVE BILL
// ===============================
function saveData() {

    let mobile = document.getElementById("mob").value;

    if (mobile.length !== 10) {
        alert("Mobile number must be 10 digits");
        return;
    }

    let items = [];
    let rows = document.getElementById("tableBody").rows;

    for (let i = 0; i < rows.length; i++) {

        let row = rows[i];

        let particular = row.cells[1].querySelector("input").value;
        let rate = row.cells[2].querySelector("input").value;
        let qty = row.cells[3].querySelector("input").value;
        let amount = row.cells[4].querySelector("input").value;

        if (particular.trim() === "") continue;

        items.push({ particular, rate, qty, amount });
    }

    let data = {
        name: document.getElementById("name").value,
        mobile: mobile,
        vehicle: document.getElementById("vehicle").value,
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        running: document.getElementById("runningkm").value,
        next: document.getElementById("nextkm").value,
        date: document.getElementById("date").value,
        bill: document.getElementById("billNo").value,
        nextservice: document.getElementById("nextservicedate").value,
        total: document.getElementById("total").value,
        advance: document.getElementById("advance").value,
        balance: document.getElementById("balance").value,
        items: items
    };

    let allBills = JSON.parse(localStorage.getItem("bills")) || [];
    allBills.push(data);

    localStorage.setItem("bills", JSON.stringify(allBills));

    alert("Saved Successfully (Demo Mode)");

    loadDashboard();
}

// ===============================
// ➕ ADD ROW (FIXED + SUGGESTION BACK)
// ===============================
let rowCount = 0;

function addRow() {

    rowCount++;

    let table = document.getElementById("tableBody");
    let tr = document.createElement("tr");

    // No
    tr.insertCell(0).innerText = rowCount;

    // Particular WITH SUGGESTION BACK
    let td1 = tr.insertCell(1);
    td1.style.position = "relative";

    td1.innerHTML = `
        <input type="text" class="particular"
            onkeyup="suggestParticular(this)"
            onfocus="showBox(this)"
            onblur="hideBox(this)">
        <div class="suggestion-box"></div>
    `;

    // Rate
    let td2 = tr.insertCell(2);
    td2.innerHTML = `<input type="number" oninput="calculateRow(this)">`;

    // Qty
    let td3 = tr.insertCell(3);
    td3.innerHTML = `<input type="number" value="1" oninput="calculateRow(this)">`;

    // Amount
    let td4 = tr.insertCell(4);
    td4.innerHTML = `<input type="text" readonly class="amount">`;

    table.appendChild(tr);
}

// ===============================
// 💡 SUGGESTION SYSTEM (RESTORED)
// ===============================
function suggestParticular(input){
    let value = input.value.toLowerCase();
    let box = input.parentElement.querySelector(".suggestion-box");

    box.innerHTML = "";

    particularData.forEach(section => {

        let filtered = section.items.filter(item =>
            item.toLowerCase().includes(value)
        );

        if(filtered.length > 0){

            let title = document.createElement("div");
            title.innerText = section.category;
            title.style.fontWeight = "bold";
            box.appendChild(title);

            filtered.forEach(item => {

                let div = document.createElement("div");
                div.innerText = item;

                div.onmousedown = function(){
                    input.value = item;
                    box.innerHTML = "";
                };

                box.appendChild(div);
            });
        }
    });
}

function showBox(input){
    let box = input.parentElement.querySelector(".suggestion-box");
    box.style.display = "block";
     suggestParticular(input);
}

function hideBox(input){
    let box = input.parentElement.querySelector(".suggestion-box");
    setTimeout(() => box.style.display = "none", 200);
}

// ===============================
// 🧮 CALCULATIONS (FIXED)
// ===============================
function calculateRow(el) {

    let row = el.parentElement.parentElement;

    let rate = Number(row.children[2].children[0].value) || 0;
    let qty = Number(row.children[3].children[0].value) || 0;

    let amount = rate * qty;

    row.children[4].children[0].value = amount;

    calculateTotal();
}

function calculateTotal() {

    let amounts = document.querySelectorAll(".amount");

    let total = 0;

    amounts.forEach(input => {
        total += Number(input.value) || 0;
    });

    document.getElementById("total").value = total;

    calculateBalance();
}

function calculateBalance() {

    let total = Number(document.getElementById("total").value) || 0;
    let advance = Number(document.getElementById("advance").value) || 0;

    document.getElementById("balance").value = total - advance;
}

// ===============================
// 📱 MOBILE VALIDATION
// ===============================
function validateMobile(input) {

    input.value = input.value.replace(/\D/g, '');

    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

//Print bill
function printBill() {
    let items = [];
    let rows = document.getElementById("tableBody").rows;

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        let particular = row.cells[1].querySelector("input").value;
        let qty = row.cells[2].querySelector("input").value;
        let rate = row.cells[3].querySelector("input").value;
        let amount = row.cells[4].querySelector("input").value;

        if (particular.trim() === "") continue;

        items.push({
            no: row.cells[0].innerText,
            particular,
            qty,
            rate,
            amount
        });
    }

    let data = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mob").value,
        vehicle: document.getElementById("vehicle").value,
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        running: document.getElementById("runningkm").value,
        next: document.getElementById("nextkm").value,
        date: document.getElementById("date").value,
        bill: document.getElementById("billNo").value,
        nextservice: document.getElementById("nextservicedate").value,
        total: document.getElementById("total").value,
        advance: document.getElementById("advance").value,
        balance: document.getElementById("balance").value,
        items: items
    };

    localStorage.setItem("billData", JSON.stringify(data));
    window.open("receipt.html", "_blank");
}
