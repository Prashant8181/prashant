// ===============================
//  GLOBAL VARIABLES
// ===============================
let currentPage = 1;
let rowsPerPage = 5;
let dataList = [];      // Full data
let filteredData = [];  // Filtered data


// ===============================
//  PAGE LOAD
// ===============================
window.onload = function () {

    //  LocalStorage madhun data ghe
    dataList = JSON.parse(localStorage.getItem("bills")) || [];

    filteredData = [...dataList];

    showPage(1);

    //  Date picker open on click
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.addEventListener("click", function () {
            this.showPicker();
        });
    });
};

// ===============================
//  SEARCH FUNCTION
// ===============================
function search() {

    let mobile = document.getElementById("mobile").value.toLowerCase();
    let vehicle = document.getElementById("vehicle").value.toLowerCase();
    let date = document.getElementById("date").value;
    let upStart = document.getElementById("upStart").value;
    let upEnd = document.getElementById("upEnd").value;

    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    // 🔍 Filtering logic
    filteredData = bills.filter(b => {

        if (mobile && !b.mobile.includes(mobile)) return false;
        if (vehicle && !b.vehicle.toLowerCase().includes(vehicle)) return false;
        if (date && b.date !== date) return false;

        //  Upcoming range
        if (upStart && upEnd) {
            let next = new Date(b.nextservice);
            return next >= new Date(upStart) && next <= new Date(upEnd);
        }

        return true;
    });

    if (filteredData.length === 0) {
        alert("No Data Found");
    }

    currentPage = 1;
    showPage(currentPage);
}

//MOBILE SUGGETION
function suggestMobile(){

    let mobile = document.getElementById("mobile").value;
    let box = document.getElementById("suggestions");

    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    if(mobile.length < 3){
        box.innerHTML = "";
        return;
    }

    // 🔍 filter from localStorage
    let data = bills.filter(b => b.mobile.includes(mobile));

    box.innerHTML = "";

    data.slice(0,5).forEach(r => {

        let div = document.createElement("div");
        div.innerText = r.mobile + " - " + r.name;

        div.onmousedown = function(){
            document.getElementById("mobile").value = r.mobile;
            box.innerHTML = "";
        };

        box.appendChild(div);
    });
}

//VEHICLE SUGGESTION 

function suggestVehicle(){

    let vehicle = document.getElementById("vehicle").value;
    let box = document.getElementById("vehicleSuggestions");

    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    if(vehicle.length < 2){
        box.innerHTML = "";
        return;
    }

    // 🔍 filter from localStorage
    let data = bills.filter(b => 
        b.vehicle.toLowerCase().includes(vehicle.toLowerCase())
    );

    box.innerHTML = "";

    data.slice(0,5).forEach(r => {

        let div = document.createElement("div");
        div.innerText = r.vehicle + " - " + r.name;

        div.onmousedown = function(){
            document.getElementById("vehicle").value = r.vehicle;
            box.innerHTML = "";
        };

        box.appendChild(div);
    });
}

// ===============================
//  DISPLAY DATA IN TABLE
// ===============================
function displayData(data) {

    let tbody = document.getElementById("result");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = "<tr><td colspan='9'>No Data Found</td></tr>";
        return;
    }

    let keyword = document.getElementById("searchInput")?.value?.toLowerCase() || "";

    data.forEach((r, index) => {

        let row = document.createElement("tr");

        //  Reminder logic
        let today = new Date();
        let nextService = new Date(r.nextservice);

        today.setHours(0,0,0,0);
        nextService.setHours(0,0,0,0);

        let diffDays = (nextService - today) / (1000 * 60 * 60 * 24);

        if (diffDays <= 3) {
            row.classList.add("danger-row"); // लाल row
        }

        row.innerHTML = `
            <td>${highlightText(r.bill, keyword)}</td>
            <td>${highlightText(r.date, keyword)}</td>
            <td>${highlightText(r.mobile, keyword)}</td>
            <td>${highlightText(r.brand, keyword)}</td>
            <td>${highlightText(r.vehicle, keyword)}</td>
            <td>${highlightText(r.model, keyword)}</td>
            <td>${highlightText(r.name, keyword)}</td>

            <td>
                ${highlightText(r.nextservice, keyword)}

                ${diffDays <= 3
                    ? `<i class="fa-solid fa-bell reminder-icon"
                         onclick="sendWhatsApp('${r.mobile}', '${r.name}', '${r.vehicle}', '${r.nextservice}')"></i>`
                    : ""}
            </td>

            <td>
                <button onclick="viewBill(${index})">👁️</button>
                <button onclick="deleteRecord(${index})">❌</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}


// ===============================
// 👁 VIEW BILL
// ===============================
function viewBill(index) {

    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    let data = bills[index];

    //  Store temp for receipt page
    localStorage.setItem("billData", JSON.stringify(data));

    window.open("../receipt.html", "_blank");
}


// ===============================
//  DELETE RECORD
// ===============================
function deleteRecord(index) {

    if (!confirm("Delete this record?")) return;

    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    bills.splice(index, 1);

    localStorage.setItem("bills", JSON.stringify(bills));

    alert("Deleted successfully ");

    //  reload
    dataList = bills;
    filteredData = bills;

    showPage(1);
}


// ===============================
//  WHATSAPP REMINDER
// ===============================
function sendWhatsApp(mobile, name, vehicle, date) {

    let formattedDate = new Date(date).toLocaleDateString('en-GB');

    let msg = `Hello ${name}, your vehicle (${vehicle}) service is due on ${formattedDate}. Please visit Morya Auto Service Point.`;

    let url = `https://wa.me/91${mobile}?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
}


// ===============================
//  TOTAL BUSINESS
// ===============================
function getTotal() {

    let start = document.getElementById("totalStart").value;
    let end = document.getElementById("totalEnd").value;

    if (!start || !end) {
        alert("Select date range");
        return;
    }

    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    let total = bills
        .filter(b => b.date >= start && b.date <= end)
        .reduce((sum, b) => sum + Number(b.total || 0), 0);

    alert("Total Business: ₹" + total);
}


// ===============================
//  RESET FORM
// ===============================
function resetForm() {
    document.querySelectorAll("input").forEach(i => i.value = "");
    filteredData = dataList;
    showPage(1);
}


// ===============================
//  HIGHLIGHT SEARCH TEXT
// ===============================
function highlightText(text, keyword) {
    if (!keyword) return text;

    let regex = new RegExp(`(${keyword})`, "gi");
    return text.toString().replace(regex, `<span class="highlight">$1</span>`);
}


// ===============================
//  GLOBAL SEARCH FILTER
// ===============================
function filterData() {

    let keyword = document.getElementById("searchInput").value.toLowerCase();

    filteredData = dataList.filter(item =>
        Object.values(item).some(value =>
            String(value).toLowerCase().includes(keyword)
        )
    );

    currentPage = 1;
    showPage(currentPage);
}


// ===============================
//  PRINT RESULTS
// ===============================
function printSearchResults() {

    let original = document.body.innerHTML;
    let table = document.querySelector(".card:last-child").innerHTML;

    document.body.innerHTML = `
        <h2 style="text-align:center;">Search Records</h2>
        ${table}
    `;

    setTimeout(() => {
        window.print();
        document.body.innerHTML = original;
        location.reload();
    }, 500);
}


// ===============================
//  PAGINATION
// ===============================
function showPage(page) {

    currentPage = page;

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    let paginatedData = filteredData.slice(start, end);

    displayData(paginatedData);

    document.getElementById("pageInfo").innerText =
        `Showing ${start + 1} to ${Math.min(end, filteredData.length)} of ${filteredData.length}`;

    document.getElementById("pageNumber").innerText = page;
}


// ===============================
// NEXT PAGE
// ===============================
function nextPage() {
    if ((currentPage * rowsPerPage) < filteredData.length) {
        currentPage++;
        showPage(currentPage);
    }
}


// ===============================
//  PREVIOUS PAGE
// ===============================
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}