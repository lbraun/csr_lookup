# Installing dependencies on server
```
# Install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# Check that it worked
command -v nvm

# Install node
nvm install 4.5
nvm use 4.5
nvm install 9.2.0
nvm use 9.2.0

# Install dependencies
npm install pg
npm install pg-format
npm install express --save
npm install body-parser

# Install postgresql
# https://www.godaddy.com/garage/how-to-install-postgresql-on-ubuntu-14-04/
sudo su -
apt-get install postgresql postgresql-contrib
```
