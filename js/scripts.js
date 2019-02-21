var ingredients;
var nameOfParfum;

function getData(data) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("data").innerHTML = this.responseText;
        }
    };

    if (data == "next") {
        nameOfParfum = getNameOfParfum();
        nameOfTeam = getNameOfTeam();
        xmlhttp.open("GET", "/data?data=" + data + "&parfum=" + nameOfParfum + "&teamName=" + nameOfTeam, true);
        xmlhttp.send();
    } else if (data == "result") {
        xmlhttp.open("GET", "/data?data=" + data + "&parfum=" + nameOfParfum + "&" + getIngredients() + "&teamName=" + nameOfTeam, true);
        xmlhttp.send();
    }
}

function getNameOfParfum() {
    element = document.getElementById('parfumName');
    if (element != null) {
        return element.value;
    } else {
        return null;
    }
}

function getNameOfTeam() {
    element = document.getElementById('teamName');
    if (element != null) {
        return element.value;
    } else {
        return null;
    }
}

function getHome() {
    location.href = "/";
}

function getIngredients() {
    return $('form').serialize();
}
function del(inputTeam) {
    var team = prompt("Please enter team name(" + inputTeam + "):", "");
    if (team == null || team == "" || team != inputTeam) {
        alert("Error: bat team name");
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                location.href = "/admin";
            }
        };
        xmlhttp.open("GET", "/reset?teamName=" + team, true);
        xmlhttp.send();
    }
}
