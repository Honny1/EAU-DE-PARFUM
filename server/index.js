/* eslint semi: "error" */
const express = require('express');
const bodyParser = require('body-parser');
const data = require('../data/data.js');
const pictures = require('../html/resultPictures.js');
const fs = require('fs');
const server = express();

function renderResult(result,res){
	res.writeHeader(200, {"Content-Type": "text/html"});
	res.write('<table style="width:100%"><tr>');  
	for (var index in result){
		switch(result[index]) {
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
	res.write('</tr></table><br><center><a onclick="location.reload();" class="btn btn-danger">AGAIN</a></center>');
    res.end();
}

function returnData (req, res) {
  if(req.query.data=='next'){
  	let type;
  	console.log(req.query.parfum);
  	data.parfums.forEach(function(parfum) {
		if (parfum.Name==req.query.parfum){
			type=parfum.Type;
		}
	});
	switch(type) {
  		case "EAU DE COLOGNE":
    		fs.readFile('./html/parfumFormTop.html', function (err, html) {
    			if (err) throw err;  
    			res.writeHeader(200, {"Content-Type": "text/html"});   
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
    		break;
  		case "EAU DE TOILETTE":
    		fs.readFile('./html/parfumFormTop.html', function (err, html) {
    			if (err) throw err;  
    			res.writeHeader(200, {"Content-Type": "text/html"});   
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

    		break;
   		case "EAU DE PARFUM":
   			fs.readFile('./html/parfumFormTop.html', function (err, html) {
    			if (err) throw err;  
    			res.writeHeader(200, {"Content-Type": "text/html"});   
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
    		break;
  		default:
    		res.send("error");
    		break;
	}
  }else if(req.query.data == 'result'){
  	//load original parfum
  	let parfumOriginal;
  	data.parfums.forEach(function(parfum) {
		if (parfum.Name==req.query.parfum){
			parfumOriginal=parfum;
		}
	});
  	
  	//load original ingredients of original parfum
  	var originalIngredients = [];
  	var str = "Ingredient0";
  	var val=1;
  	for(var index in parfumOriginal) {	
  		if(str==index){
  			originalIngredients.push(parfumOriginal[index]);
  			str="Ingredient" + val++;
  		}
	}

  	//load input ingredients of input 
	var inputIngredients = [];
  	var str = "Ingredient0";
  	var val=1;
  	for(var index in req.query) {
  		if(str==index){
  			inputIngredients.push(req.query[index]);
  			str="Ingredient" + val++;
  		}
	}

	//evaluation of input ingredients
  	var result = {};
  	inputIngredients.forEach(function(item,index) {
  		result[index] ="miss";
  	});

	originalIngredients.forEach(function(originalIngredient,index) {
  		inputIngredients.forEach(function(inputIngredient,index) {
  			if(originalIngredient==inputIngredient){
  				result[index]="hit";
  			}
		});
	});

	inputIngredients.forEach(function(inputIngredient,index) {
  		if(originalIngredients[index]==inputIngredient){
  			result[index]="critical-hit";
  		}
	});
	
	
	console.log(originalIngredients);
	console.log(inputIngredients);
	console.log(result)

	renderResult(result,res);  		
  }
}

function returnMixPage (req, res) {
	fs.readFile('./html/mixTop.html', function (err, html) {
    	if (err) throw err;  
    	res.writeHeader(200, {"Content-Type": "text/html"});   
    	res.write(html); 

    	var teams = ['team1','team2'];

    	res.write('<label for="sel1">Team</label><select teamName name="Team" class="form-control dropdown-primary" size="1" required><option value="" disabled selected>Choose team</option>');
    	teams.forEach(function(item) {
			res.write('<option value="' + item + '">' + item + '</option>');
  		});
    	res.write('</select>');  

    	res.write('<label for="sel1">Parfum</label><select id="parfumName" name="Team" class="form-control dropdown-primary" size="1" required><option value="" disabled selected>Choose Parfum</option>');
    	data.parfums.forEach(function(item) {
    		switch(item.Type) {
  				case "EAU DE COLOGNE":
  					res.write('<option class="text-white bg-danger" value="' + item.Name + '">'+item.ID + ' ' +item.Name + '</option>');
  					break;
  				case "EAU DE TOILETTE":
  					res.write('<option class="text-white bg-warning" value="' + item.Name + '">'+item.ID + ' ' +item.Name + '</option>');
  					break;
	    		case "EAU DE PARFUM":
    				res.write('<option class="text-white bg-success" value="' + item.Name + '">'+item.ID + ' ' +item.Name + '</option>');
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
}

function returnAdminPage (req, res) {
  res.send('AdminPage-NotImplemented');
}

function returnCss (req, res) {
 fs.readFile('./css/my.css', function (err, css) {
    	if (err) throw err; 
  		res.writeHeader(200, {"Content-Type": "text/css"});  
        res.write(css);  
        res.end(); 
  	});
}

function returnJs (req, res) {
  fs.readFile('./js/scripts.js', function (err, javaScript) {
    	if (err) throw err; 
  		res.writeHeader(200, {"Content-Type": "text/javascript"});  
        res.write(javaScript);  
        res.end(); 
  	});
}

function home (req, res) {
	fs.readFile('./html/index.html', function (err, html) {
    	if (err) throw err; 
  		res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end(); 
  	});
}

server.use(bodyParser.json());

server.get('/', home);
server.get('/data', returnData);
server.get('/css', returnCss);
server.get('/js', returnJs);
server.get('/mix', returnMixPage);
server.get('/admin', returnAdminPage);

module.exports = server;