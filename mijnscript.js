


function verstuurHetZakkie() {
    var brander = document.getElementById('branderinput').value
    var producent = document.getElementById('producentinput').value
    var land = document.getElementById('landinput').value;
    var proces = document.getElementById('landinput').value;
    var score = document.getElementById('scoreinput').value;
    //  var naam = document.getElementById('input_3').value;
    //  var regio = document.getElementById('input_5').value;
    //         var type = "arabica";
    //         var hoogte = document.getElementById('input_9').value;
    //         var varieteiten = document.getElementById('input_8').value
    //         var oogstjaar = document.getElementById('input_11').value;
    //         var notes = document.getElementById('input_12').value;
    //         var review = document.getElementById('input_14').value;
    //         var prijs = document.getElementById('input_15').value;
    //         var via = document.getElementById('input_16').value;

    var zakkie = {};
    zakkie.brander = brander;
    zakkie.producent = producent;
    zakkie.land = land;
    zakkie.score = score;
    zakkie.proces = proces;
    //zakkie.varieteiten = varieteiten;
    //   zakkie.naam = naam;
    //    zakkie.regio = regio;
    //      zakkie.type = type;
    //      zakkie.hoogte = hoogte;

    //      zakkie.oogstjaar = oogstjaar;
    //      zakkie.notes = notes;
    //      zakkie.review = review;
    //      zakkie.prijs = prijs;
    //      zakkie.via = via;

    console.log(zakkie);

    var djeesonzakkie = JSON.stringify(zakkie);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        console.log(this.responseText),
            document.getElementById("antwoord").innerHTML = this.responseText
    }
    xhr.open("POST", "http://localhost:8082/zakkies", true);
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(djeesonzakkie);
}

// laat de inhoud van de database zien, Dave's methode
// function laatDbZien() {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         var inhoudDB = JSON.parse(this.responseText);
//         string1 = "";
//         for (x = 0; x < inhoudDB.length; x++) {
//             string1 +=
//                 "<li><span><i class='fa fa-trash'></i></span>" +
//                 "<button type='button' class= 'btn btn-outline-warning'>" + "Wijzig" + "</button>" +
//                 " " + inhoudDB[x].id +
//                 " " + inhoudDB[x].brander +
//                 " " + inhoudDB[x].producent +
//                 " " + inhoudDB[x].land +
//                 " " + inhoudDB[x].proces +
//                 " " + inhoudDB[x].score +
//                 " " + "<button type='button' class= 'btn btn-outline-danger'>" + "Verwijder" + "</button></li>";
//         }
//         document.getElementById('zakkiesLijst').innerHTML = string1;
//     }
//     xhr.open("GET", "http://localhost:8082/zakkies/", true);
//     xhr.send();
// }
//verwijder zakkie michiels methode


// window.onload = laatDbZien();
// function start() {
//     getMedewerkers();
// }

// window.onload = start;

//tabel maken nieuwe methode
function zakkiesTabelMakenOjee() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var parsed = JSON.parse(this.responseText);
        console.table(parsed);
        // (A) RAW JSON DATA
        //var jsondata = '{"Name":"John Doe","Email":"john@doe.com","Gender":"male"}';
        // (B) PARSE JSON INTO OBJECT
        // var parsed = JSON.parse(jsondata);
        // (C) LOOP THROUGH OBJECT + DRAW TABLE
        var theHTML = "<table style ='border-width: 1;'>";
        for (let key in parsed) {
            console.log("KEY: " + key);
            // (D) LOOP THE ARRAY AND OBJECTS
            if (typeof parsed[key] == "object") {
                for (let i in parsed[key]) {
                    console.log("   KEY: " + i);
                    console.log("   VALUE: " + parsed[key][i]);
                    theHTML += "<tr>";
                    theHTML += "<td>" + key + "</td>";
                    theHTML += "<td>" + parsed[key] + "</td>";
                    theHTML += "</tr>";
                }
            } else {
                console.log("VALUE: " + parsed[key]);
                // theHTML += "<tr>";
                theHTML += "<td>" + key + "</td>";
                theHTML += "<td>" + parsed[key] + "</td>";
                // theHTML += "</tr>";
            }
        }
        theHTML += "</table>";
        // (D) PUT INTO HTML CONTAINER
        // Add <div id="tableWrap"></div> to your HTML
        document.getElementById("tableWrap").innerHTML = theHTML;
    }

    xhr.open("GET", "http://localhost:8082/zakkies/", true);
    xhr.send();
}
