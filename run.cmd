@echo off
del /F db\mongod.lock
timeout 1
echo "check and repair DB files"
start mongodb/bin/mongod.exe --repair --dbpath="./db"
timeout 5
echo "start DB server!"
start mongodb/bin/mongod.exe --dbpath="./db"
echo "start web server!"
start index-win.exe
echo "server and database server run!!!"
start http://127.0.0.1:8080/
