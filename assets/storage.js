const CACHE_KEY = "calculation_history";


// fungsi cek storage
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}
// fungsi menyimpan data riwayat
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        // json.parse -> mengubah nilai objek dalam bentuk string kembali pada bentuk objek js
  
        historyData.unshift(data);
//   unshift digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
        if (historyData.length > 5) {
            historyData.pop();
        }
        // pop berfungsi untuk menghapus nilai index terakhir pada array
//   json.stringify digunakan untuk mengubah objek js ke dalam bentuk string
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
 }


//  fungsi untuk mendapatkan data history
// Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong.
 function showHistory() {
     if (checkForStorage()) {
         return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
     } else {
         return [];
     }
 }

//  fungsi render data riwayat history
 function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
  
  
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
 }

 renderHistory();