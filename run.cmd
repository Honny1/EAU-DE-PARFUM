echo@off
del ./db/mongodb.lock
start mongodb/bin/mongod.exe --repair --dbpath="./db"
start mongodb/bin/mongod.exe --dbpath="./db"
start index-win.exe
echo "server and database run!!!"

