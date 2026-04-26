window.onload = function () {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    // 🔵 CASE 1: From DB (Eye button)
    if(id){
        fetch(`http://localhost:8080/receipt/${id}`)
        .then(res => res.json())
        .then(data => fillReceipt(data))
        .catch(err => {
            console.error(err);
            alert("Error loading receipt");
        });
    }
    
    // 🟢 CASE 2: From localStorage (new bill)
    else{
        let data = JSON.parse(localStorage.getItem("billData"));

        if (!data) {
            alert("No data found");
            return;
        }

        fillReceipt(data);
    }
}

//Common function
function fillReceipt(data){

    // BASIC
    document.getElementById("r_name").innerText = data.name;
    document.getElementById("r_mobile").innerText = data.mobile;
    document.getElementById("r_vehicle").innerText = data.vehicle;
    document.getElementById("r_brand").innerText = data.brand;
    document.getElementById("r_model").innerText = data.model;
    document.getElementById("r_running").innerText = data.running;
    document.getElementById("r_next").innerText = data.next;
    document.getElementById("r_date").innerText = data.date;
    document.getElementById("r_bill").innerText = data.bill;
    document.getElementById("r_nextservice").innerText = data.nextservice;
    document.getElementById("r_total").innerText = data.total;
    document.getElementById("r_advance").innerText = data.advance;
    document.getElementById("r_balance").innerText = data.balance;

    // TABLE
    let receiptTable = document.getElementById("receiptTableBody");
    receiptTable.innerHTML = "";
	

	data.items.forEach((item, index) => {
	    receiptTable.innerHTML += `
	    <tr>
	        <td>${index + 1}</td>
	        <td>${item.particular}</td>
	        <td>${item.rate}</td>
	        <td>${item.qty}</td>
	        <td>${item.amount}</td>
	    </tr>`;
	});

    // 🖨️ AUTO PRINT
    setTimeout(() => {
        window.print();
    }, 500);
}