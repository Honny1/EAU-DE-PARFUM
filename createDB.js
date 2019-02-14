var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/parfum";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
  MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("parfum");
    dbo.createCollection("teams", function(err, res) {
      if (err) throw err;
      console.log("Collection teams created!");
      dbo.createCollection("teamAttempts", function(err, res) {
        if (err) throw err;
        console.log("Collection teamAttempts created!");
        db.close();
      

      //testTeam
      MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("parfum");
        
        var team = { name: "Hony" };
        dbo.collection("teams").insertOne(team, function(err, res) {
          if (err) throw err;
          console.log("added team");
          db.close();
        });

        var teamAttempt0 = { 
            teamName: "Hony",
            try: 0, 
            originalIngredients:[ 'Bergamont', 'Fialka', 'Ibišek', 'Ibišek' ],
            inputIngredients:[ 'Kosatec', 'Vanilka', 'Rozmarýn', 'Ibišek' ],
            result: { '0': 'miss', '1': 'miss', '2': 'miss', '3': 'critical-hit' }
          };

        var teamAttempt1 = { 
            teamName: "Hony",
            try: 0, 
            originalIngredients:[ 'Bergamont', 'Fialka', 'Ibišek', 'Ibišek' ],
            inputIngredients:[ 'Bergamont', 'Fialka', 'Rozmarýn', 'Ibišek' ],
            result: { '0': 'miss', '1': 'miss', '2': 'miss', '3': 'critical-hit' }
          };

        dbo.collection("teamAttempts").insertOne(teamAttempt0, function(err, res) {
          if (err) throw err;
          console.log("added teamAttempt0");
          db.close();
        });

        dbo.collection("teamAttempts").insertOne(teamAttempt1, function(err, res) {
          if (err) throw err;
          console.log("added teamAttempt1");
          db.close();
        });
      });
      //end testTeam
    });
  });
});
});


setTimeout(function(){
//print data form 
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("parfum");
  dbo.collection('teams').aggregate([
    { $lookup:
      {
        from: 'teamAttempts',
        localField: 'name',
        foreignField: 'teamName',
        as: 'attempts'
      }
    }
  ]).toArray(function(err, res) {
  if (err) throw err;
  console.log(JSON.stringify(res));
  db.close();
  });
});
}, 2000);