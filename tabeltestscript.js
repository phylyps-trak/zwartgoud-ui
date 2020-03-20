window.onload = start;

function start() {
    maakTabelVanJson();
}

//DELETE de rij van de tabel in de view
function deleteRow(i) {
    document.getElementById("mijntabel666").deleteRow(i);
  }
//DELETE het bijbehorend item uit de database
  function verwijderZakkie(i) {
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(this.responseText),
            document.getElementById("antwoord").innerHTML = this.responseText
    }
    xhr.open("DELETE", "http://localhost:8082/zakkies/" + i);
    xhr.send();
}
// voor beide deletefuncties in enen te stoppen
function dikkeDeleteAlles(btn){
    var row_index = btn.parentNode.parentNode.rowIndex;
    var zakkie_id = btn.parentNode.getAttribute('data-id');
    verwijderZakkie(zakkie_id);
    deleteRow(row_index);
    alert("dat zakkie staat er nu niet meer in!");
}

//GET
function maakTabelVanJson() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var parsedZakkies = JSON.parse(this.responseText);
        console.table(parsedZakkies);
        console.log(this.responseText),
      document.getElementById("antwoord").innerHTML = this.responseText
     
        // pluk de waarden er uit die in de table header moeten
        // id	brander	producent	land	proces	score	-->actie: komt er later bij
        var col = [];
        for (var i = 0; i < parsedZakkies.length; i++) {
            for (var key in parsedZakkies[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // maak dynamisch tabel
        var mijntabel = document.createElement("table");
        mijntabel.setAttribute("id", "mijntabel666");

        //deleteknop
        var delKnop = "<td><button class='btn btn-outline-danger btn-sm' onclick='dikkeDeleteAlles(this)'>  X  </button></td>";
        // MAAK HTML TABLE HEADER MET DE DATA VAN HIERBOVEN

        var tr = mijntabel.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // GELOOPTE TABLE HEADER uit JSON
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        var th2 = document.createElement("th");      // extra TABLE HEADER voor knoppen
            th2.innerHTML = "actie:";
            tr.appendChild(th2);

        // stop de JSON data in de tabels als ROWS.
        for (var i = 0; i < parsedZakkies.length; i++) {

            tr = mijntabel.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);

                // ingevoegd: id die je er uit kan plukken om database entry te verwijderen
                tabCell.innerHTML =  parsedZakkies[i][col[j]]
                        }

            var tabCell2 = tr.insertCell(-1);
            tabCell2.setAttribute('data-id', parsedZakkies[i].id)
            console.log(parsedZakkies[i].id)
            tabCell2.innerHTML = delKnop;
           
        }
        // STOP M IN DE CONTAINER
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(mijntabel);
    }
    xhr.open("GET", "http://localhost:8082/zakkies/", true);
    xhr.send();
}




