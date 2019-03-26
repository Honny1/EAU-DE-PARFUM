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
            color();
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

function color() {
    let type0 = {
        '0-5': 'white',
        '5-7': 'orange',
        '7-100': 'red'
    };

    let type1 = {
        '0-6': 'white',
        '6-8': 'orange',
        '8-100': 'red'
    };
    let type2 = {
        '0-7': 'white',
        '7-9': 'orange',
        '9-100': 'red'
    };
    function between(x, min, max) {
        return x >= min && x <= max;
    }
    let dc;
    let first;
    let second;
    let th;
    let type;

    $('h3').each(function (index) {
        th = $(this);
        type = parseInt($(this).attr('parfumType'), 10);
        dc = parseInt($(this).attr('data-color'), 10);
        console.log(type);
        if (type == 0) {
            $.each(type0, function (name, value) {
                first = parseInt(name.split('-')[0], 10);
                second = parseInt(name.split('-')[1], 10);
                console.log(between(dc, first, second));
                if (between(dc, first, second)) {
                    document.getElementById("H3").style.color = value;
                }
            });
        } else if (type == 1) {
            $.each(type1, function (name, value) {
                first = parseInt(name.split('-')[0], 10);
                second = parseInt(name.split('-')[1], 10);
                console.log(between(dc, first, second));
                if (between(dc, first, second)) {
                    document.getElementById("H3").style.color = value;
                }
            });
        } else {
            $.each(type2, function (name, value) {
                first = parseInt(name.split('-')[0], 10);
                second = parseInt(name.split('-')[1], 10);
                console.log(between(dc, first, second));
                if (between(dc, first, second)) {
                    document.getElementById("H3").style.color = value;
                }
            });
        }
    });
}