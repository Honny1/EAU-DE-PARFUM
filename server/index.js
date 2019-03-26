/* eslint semi: "error" */
const express = require('express');
const bodyParser = require('body-parser');
const data = require('../data/data.js');
const pictures = require('../html/pictures.js');
const fs = require('fs');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const { parse } = require('querystring');

function renderResult(result, res) {
	res.writeHeader(200, { "Content-Type": "text/html" });
	res.write('<table style="width:100%"><tr>');
	for (var index in result) {
		switch (result[index]) {
			case "miss":
				res.write('<th>');
				res.write(pictures.err);
				res.write('</th>');
				break;
			case "hit":
				res.write('<th>');
				res.write(pictures.questionMark);
				res.write('</th>');
				break;
			case "critical-hit":
				res.write('<th>');
				res.write(pictures.check);
				res.write('</th>');
				break;
			default:
				res.write("error");
				break;
		}
	}
	res.write('</tr></table><br><center><input type="submit" onclick="location.reload();" name="" value="Znovu" class="btn_Danger"><input type="submit" onclick="getHome();" name="" value="Domů" class="btn_Success">');
	res.end();
}

function returnData(req, res) {
	if (req.query.data == 'next') {
		let type;

		//console.log(req.query.parfum);
		data.parfums.forEach(function (parfum) {
			if (parfum.Name == req.query.parfum) {
				type = parfum.Type;
			}
		});
		res.writeHeader(200, { "Content-Type": "text/html" });
		switch (type) {
			case "EAU DE COLOGNE":
				MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
					if (err) throw err;
					var dbo = db.db("parfum");
					dbo.collection("teamAttempts").find({ teamName: req.query.teamName, parfumName: req.query.parfum }).toArray(function (err, result) {
						if (err) throw err;
						db.close();
						res.write('<h3 id = "H3" parfumType="0" data-color="' + result.length + '">' + result.length + ' z 7</h3>');
						fs.readFile('./html/parfumFormTop.html', function (err, html) {
							if (err) throw err;
							res.write(html);
							fs.readFile('./html/parfumFormType1.html', function (err, html) {
								if (err) throw err;
								res.write(html);
								fs.readFile('./html/parfumFormEnd.html', function (err, html) {
									if (err) throw err;
									res.write(html);
									res.end();
								});
							});
						});
					});
				});
				break;
			case "EAU DE TOILETTE":
				MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
					if (err) throw err;
					var dbo = db.db("parfum");
					dbo.collection("teamAttempts").find({ teamName: req.query.teamName, parfumName: req.query.parfum }).toArray(function (err, result) {
						if (err) throw err;
						db.close();
						res.write('<h3 id = "H3" parfumType="1" data-color="' + result.length + '">' + result.length + ' z 8</h3>');
						fs.readFile('./html/parfumFormTop.html', function (err, html) {
							if (err) throw err;
							res.write(html);
							fs.readFile('./html/parfumFormType2.html', function (err, html) {
								if (err) throw err;
								res.write(html);
								fs.readFile('./html/parfumFormEnd.html', function (err, html) {
									if (err) throw err;
									res.write(html);
									res.end();
								});
							});
						});
					});
				});

				break;
			case "EAU DE PARFUM":
				MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
					if (err) throw err;
					var dbo = db.db("parfum");
					dbo.collection("teamAttempts").find({ teamName: req.query.teamName, parfumName: req.query.parfum }).toArray(function (err, result) {
						if (err) throw err;
						db.close();
						res.write('<h3 id = "H3" parfumType="3" data-color="' + result.length + '">' + result.length + ' z 9</h3>');
						fs.readFile('./html/parfumFormTop.html', function (err, html) {
							if (err) throw err;
							res.write(html);
							fs.readFile('./html/parfumFormType3.html', function (err, html) {
								if (err) throw err;
								res.write(html);
								fs.readFile('./html/parfumFormEnd.html', function (err, html) {
									if (err) throw err;
									res.write(html);
									res.end();
								});
							});
						});
					});
				});
				break;
			default:
				res.send("error");
				break;
		}
	} else if (req.query.data == 'result') {
		//load original parfum
		let parfumOriginal;
		data.parfums.forEach(function (parfum) {
			if (parfum.Name == req.query.parfum) {
				parfumOriginal = parfum;
			}
		});

		//load original ingredients of original parfum
		var originalIngredients = [];
		var str = "Ingredient0";
		var val = 1;
		for (var index in parfumOriginal) {
			if (str == index) {
				originalIngredients.push(parfumOriginal[index]);
				str = "Ingredient" + val++;
			}
		}

		//load input ingredients of input 
		var inputIngredients = [];
		var str = "Ingredient0";
		var val = 1;
		for (var index in req.query) {
			if (str == index) {
				inputIngredients.push(req.query[index]);
				str = "Ingredient" + val++;
			}
		}

		//evaluation of input ingredients
		let OutputResult = [];
		let maxIngredients = inputIngredients.length;
		inputIngredients.forEach(function (item, index) {
			OutputResult[index] = "miss";
		});

		originalIngredients.forEach(function (originalIngredient, index) {
			inputIngredients.forEach(function (inputIngredient, index) {
				if (originalIngredient == inputIngredient) {
					OutputResult[index] = "hit";
				}
			});
		});

		var count = 0;
		for (var i = 0; i < inputIngredients.length; i++) {
			for (var j = 0; j < inputIngredients.length; j++) {
				if (inputIngredients[i] == inputIngredients[j]) {
					count++;
				}
			}
		}

		inputIngredients.forEach(function (inputIngredient, index) {
			if (originalIngredients[index] == inputIngredient) {
				inputIngredients.forEach(function (inputIngredient1, index1) {

					let x = 0;
					originalIngredients.forEach(function (item, index) {
						if (item == inputIngredient) {
							x++;
						}
					});

					if (originalIngredients[index1] != inputIngredient1 && inputIngredient == inputIngredient1 && (x <= 1 || count / inputIngredients.length == inputIngredients.length)) {
						OutputResult[index1] = "miss";
					}
				});
				OutputResult[index] = "critical-hit";
			}
		});

		MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db("parfum");
			dbo.collection("teamAttempts").find({ teamName: req.query.teamName, parfumName: req.query.parfum }).toArray(function (err, result) {
				if (err) throw err;
				db.close();
				var teamAttempt = {
					teamName: req.query.teamName,
					try: result.length,
					parfumName: req.query.parfum,
					originalIngredients: originalIngredients,
					inputIngredients: inputIngredients,
					outputResult: OutputResult
				};

				MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
					if (err) throw err;
					var dbo = db.db("parfum");
					dbo.collection("teamAttempts").insertOne(teamAttempt, function (err, res) {
						if (err) throw err;
						/*
											console.log("\nadded teamAttempt");
											console.log('Parfum name: ' + req.query.parfum);
											console.log('Team name: ' + req.query.teamName);
											console.log('Try: ' + result.length);
											console.log('Right solution: ' + originalIngredients);
											console.log('Team solution: ' + inputIngredients);
											console.log('Result: ');
											console.log(OutputResult);
											*/
						db.close();
					});
				});
			});
		});

		renderResult(OutputResult, res);
	}
}

function returnMixPage(req, res) {
	fs.readFile('./html/mixTop.html', function (err, html) {
		if (err) throw err;
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);

		var teams = [];

		MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db("parfum");
			dbo.collection("teams").find().toArray(function (err, result) {
				if (err) throw err;
				result.forEach(function (item) {
					teams.push(item.name);
				});
				db.close();
				res.write('<label for="sel1">Tým</label><select id="teamName" class="teamName" size="1" required><option value="" disabled selected>Vyber tým</option>');
				teams.forEach(function (item) {
					res.write('<option value="' + item + '">' + item + '</option>');
				});
				res.write('</select>');

				res.write('<label for="sel1" class="labelPerfume">Parfém</label><select id="parfumName" class="perfumeName" size="1" required><option value="" disabled selected>Vyber parfém</option>');
				data.parfums.forEach(function (item) {
					switch (item.Type) {
						case "EAU DE COLOGNE":
							res.write('<option class="text_WhiteDanger" value="' + item.Name + '">' + item.ID + ' ' + item.Name + '</option>');
							break;
						case "EAU DE TOILETTE":
							res.write('<option class="text_WhiteWarning" value="' + item.Name + '">' + item.ID + ' ' + item.Name + '</option>');
							break;
						case "EAU DE PARFUM":
							res.write('<option class="text_WhiteSuccess" value="' + item.Name + '">' + item.ID + ' ' + item.Name + '</option>');
							break;
						default:
							res.write("error");
							break;
					}
				});
				res.write('</select>');
				fs.readFile('./html/mixEnd.html', function (err, html) {
					if (err) throw err;
					res.write(html);
					res.end();
				});
			});
		});
	});
}

function returnAdminPage(req, res) {
	//save team
	if (req.method == 'POST') {
		MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			collectRequestData(req, result => {
				//console.log(result);
				var team = { name: result.teamName };
				var dbo = db.db("parfum");
				dbo.collection("teams").insertOne(team, function (err, res) {
					if (err) throw err;
					//console.log("added team");
					db.close();
				});
			});
		});
	}
	//render html
	fs.readFile('./html/adminTop.html', function (err, html) {
		if (err) throw err;
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);

		MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db("parfum");
			dbo.collection("teams").find({ name: /team/ }).toArray(function (err, result) {
				if (err) throw err;
				//console.log(result.length);
				db.close();

				res.write('<input class="form_teamName" name="teamName" id="teamName" type="text" placeholder="Jméno týmu" value="team' + result.length + '">');
				res.write('</th><th><center><input class="btn_Add" type="submit" value="ADD"></center></div></th></tr></table>');

				MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
					res.write('</form></div>');
					if (err) throw err;
					var dbo = db.db("parfum");
					dbo.collection("teams").find().toArray(function (err, result) {
						if (err) throw err;
						result.forEach(function (item) {
							res.write('<a href="/teamInfo?data=' + item.name + '"class="btn_teamName">' + item.name + '</a></br>');
						});

						db.close();


						fs.readFile('./html/adminEnd.html', function (err, html) {
							if (err) throw err;
							res.write(html);
							res.end();
						});

					});
				});
			});
		});
	});
}

//get POST data
function collectRequestData(request, callback) {
	const FORM_URLENCODED = 'application/x-www-form-urlencoded';
	if (request.headers['content-type'] === FORM_URLENCODED) {
		let body = '';
		request.on('data', chunk => {
			body += chunk.toString();
		});
		request.on('end', () => {
			callback(parse(body));
		});
	}
	else {
		callback(null);
	}
}


function teamInfo(req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		if (err) throw err;
		var dbo = db.db("parfum");
		dbo.collection('teams').aggregate([{
			$lookup: {
				from: 'teamAttempts',
				localField: 'name',
				foreignField: 'teamName',
				as: 'attempts'
			}
		}
		]).toArray(function (err, result) {
			if (err) throw err;
			db.close();
			let team;
			result.forEach(function (item, index) {
				if (item.name == req.query.data) {
					team = item;
				}
			});
			res.writeHead(200, { 'Content-Type': 'text/html' });

			fs.readFile('./html/teamTop.html', function (err, html) {
				if (err) throw err;
				res.write(html);
				res.write('<h2 style="font-weight: bold;">Tým: ' + team.name + '</h2>');
				team.attempts.reverse();
				team.attempts.forEach(function (item, index) {
					var parfum = data.parfums.find(parfum => parfum.Name === item.parfumName);
					res.write('</br><h4 style="font-weight: bold;">' + parfum.ID + " " + item.parfumName + ': ' + item.try + '</h4>');
					res.write('<table style="width:100%;">');
					res.write('<tr>');
					res.write('<th>Správné řešení: </th>');
					item.originalIngredients.forEach(function (item, index) {
						res.write('<th>' + item + '</th>');
					});
					res.write('</tr><tr>');
					res.write('<th>Řešení týmu: </th>');
					item.inputIngredients.forEach(function (item, index) {
						res.write('<th>' + item + '</th>');
					});
					res.write('</tr><tr>');
					res.write('<th>Výsledek: </th>');
					item.outputResult.forEach(function (item, index) {
						res.write('<th>' + item + '</th>');
					});
					res.write('</tr></table></br>');
				});
				res.write('<center><a onclick="del(\'' + team.name + '\')" class="btn_Danger">SMAZAT TÝM</a>');
				fs.readFile('./html/teamEnd.html', function (err, html) {
					if (err) throw err;
					res.write(html);
					res.end();
				});
			});
		});
	});
}

function reset(req, res) {

	let willRemove = req.query.teamName;
	if (req.query.teamName == 'all') {
		willRemove = / */;
	}
	MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		if (err) throw err;
		var myquery = { name: willRemove };
		var dbo = db.db("parfum");
		dbo.collection("teams").deleteMany(myquery, function (err, obj) {
			if (err) throw err;
			res.write(obj.result.n + " týmy smazány\n");
			db.close();
			MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
				if (err) throw err;
				var myquery = { teamName: willRemove };
				var dbo = db.db("parfum");
				dbo.collection("teamAttempts").deleteMany(myquery, function (err, obj) {
					if (err) throw err;
					res.write(obj.result.n + " pokusy smazány");
					db.close();
					res.end();
				});
			});
		});
	});
}

function returnJs(req, res) {
	fs.readFile('./js/scripts.js', function (err, javaScript) {
		if (err) throw err;
		res.writeHeader(200, { "Content-Type": "text/javascript" });
		res.write(javaScript);
		res.end();
	});
}

function returnJquery(req, res) {
	fs.readFile('./js/jquery.min.js', function (err, javaScript) {
		if (err) throw err;
		res.writeHeader(200, { "Content-Type": "text/javascript" });
		res.write(javaScript);
		res.end();
	});
}

function home(req, res) {
	fs.readFile('./html/index.html', function (err, html) {
		if (err) throw err;
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
}

function returnDohny(req, res) {
	fs.readFile('./css/Dohny.css', function (err, css) {
		if (err) throw err;
		res.writeHeader(200, { "Content-Type": "text/css" });
		res.write(css);
		res.end();
	});
}

function returnBackground(req, res) {
	var img = fs.readFileSync('./images/bg.jpg');
	res.writeHead(200, { 'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
}

server.use(bodyParser.json());

server.get('/', home);
server.get('/mix', returnMixPage);
server.get('/admin', returnAdminPage);
server.post('/admin', returnAdminPage);
server.get('/teamInfo', teamInfo);
server.get('/reset', reset);


server.get('/data', returnData);
server.get('/js', returnJs);
server.get('/jquery', returnJquery);
server.get('/Dohny', returnDohny);
server.get('/background', returnBackground);

server.post('*', home);
server.get('*', home);

module.exports = server; 
