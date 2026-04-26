// ===============================
// PAGE LOAD 
// ===============================
window.addEventListener("DOMContentLoaded", function () {
    loadDashboard();
    loadNotice();
});


// ===============================
// DASHBOARD (localStorage based)
// ===============================
function loadDashboard() {

    // 📦 get all bills from localStorage
    let bills = JSON.parse(localStorage.getItem("bills")) || [];

    // 📅 today date (YYYY-MM-DD)
    let today = new Date().toISOString().split("T")[0];

    // 📊 filter today's bills
    let todayBills = bills.filter(b => b.date === today);

    // 👉 Today Bills Count
    document.getElementById("todayCount").innerText = todayBills.length;

    // 👉 Total Bills
    document.getElementById("totalBills").innerText = bills.length;

    // 👉 Last Customer
    if (bills.length > 0) {
        document.getElementById("lastCustomer").innerText =
            bills[bills.length - 1].name;
    } else {
        document.getElementById("lastCustomer").innerText = "-";
    }

    // 👉 Today Amount
    let totalAmount = todayBills.reduce((sum, b) => {
        return sum + Number(b.total || 0);
    }, 0);

    document.getElementById("todayAmount").innerText = "₹" + totalAmount;
}


// ===============================
// SAVE NOTICE
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


// ===============================
// LOAD NOTICE LIST
// ===============================
function loadNotice() {

    let list = document.getElementById("noticeList");
    list.innerHTML = "";

    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    notices.forEach((n, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            <span>✔ ${n}</span>
            <button class="delete-btn" onclick="deleteNotice(${index})">
                <i class="fa fa-times"></i>
            </button>
        `;

        list.appendChild(li);
    });
}


// ===============================
// DELETE NOTICE
// ===============================
function deleteNotice(index) {

    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    notices.splice(index, 1);

    localStorage.setItem("notices", JSON.stringify(notices));

    loadNotice();
}


// ===============================
//CLEAR INPUT
// ===============================
function clearNotice() {
    document.getElementById("noticeText").value = "";
}