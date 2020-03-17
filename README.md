# EAU-DE-PARFUM

Application for faster game evaluation.

## Run on Windows

## Install

Install app with exe file in [releases](https://github.com/Honny1/EAU-DE-PARFUM/releases).
Run with icon on your desktop. 

### Run from source

```bash
git clone https://github.com/Honny1/EAU-DE-PARFUM.git
cd EAU-DE-PARFUM
```

**WARNING**
> before run unzip mongodb.zip!

```
run.cmd
``` 

# For developer

## Run on Linux/Win

```bash
git clone https://github.com/Honny1/EAU-DE-PARFUM.git
cd EAU-DE-PARFUM

```

* Install Node.js https://nodejs.org/en/
* Install MongoDB https://www.mongodb.com/download-center/community

```bash
npx nodemon (need install node.js and mongodb server)
```
Then open http://127.0.0.1:8080 in web browser.

## Budil app window/linux/macos

```bash
npx pkg index.js
```
## Setup for Armbian 

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
