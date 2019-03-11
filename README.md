# EAU-DE-PARFUM
Application for faster game evaluation.

#Production run on WINDOWS
**WARNING**
> before run unzip mongodb.zip!
```bash
run.cmd
```
#Developer run on linux/win
```bash
npx nodemon (need install node.js and mongodb server)
```
#Budil app window/linux/macos (need mongodb server on localhost)
```bash
npx pkg index.js
```
#Setup for Armbian 
```bash
#INSTALL MONGODB 

https://github.com/robertsLando/MongoDB-OrangePI

#EDIT MONGODB SERVICE CONFIG (/lib/systemd/system/mongodb.service)

[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStartPre=/usr/bin/mongod --repair --dbpath /var/lib/mongodb/
ExecStart=/usr/bin/mongod --quiet --config /etc/mongodb.conf

[Install]
WantedBy=multi-user.target

#INSTALL NODE.JS

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs


#INSTALL APP AS SERVICE 
sudo npm install -g forever
sudo npm install -g forever-service
sudo forever-service install EAU-DE-PARFUM --script index.js
sudo service EAU-DE-PARFUM status
sudo service EAU-DE-PARFUM enable
sudo reboot
```
