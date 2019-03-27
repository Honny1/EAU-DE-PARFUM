echo@off
del ./db/mongodb.lock
timeout 1
start mongodb/bin/mongod.exe --repair --dbpath="./db"
timeout 5
start mongodb/bin/mongod.exe --dbpath="./db"
start index-win.exe
echo "server and database run!!!"
start http://127.0.0.1:8080/
