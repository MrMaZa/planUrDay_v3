# planUrDay
Web-app using Django, React, PostgresSQL to create a somehow duplicate of Outlook calendar/Google calendar

Database installation:
Download the newest version of the PostgresSQL and install it with creation of server on the default port.

Open the pgAdmin app under C:\Program Files\PostgreSQL\10\pgAdmin 4\bin folder - pgAdmin4.execute

Connect to the server and create a superuser with the data:
username: pud,
password: pudpassword,

And create database with the given data:
database-name: planUrDay
user: pud

Install Python version 3.6.5

Check for the version with: python --version

Install pip

Install virtualenv:
pip install virtualenv

Open console in the current folder and create python virtual environment:
virtualenv env

Activate env:
env\Scripts\activate

Install necessary python dependencies with:
pip install -r requirements.txt

To start python project go to the planUrDay folder and execute commands:
python manage.py migrate
python manage.py runserver

To test if everything is working go to 127.0.0.1:8000

For frontend you'll need npm and yarn installed, then open frontend\gui\ folder and run:
npm install 

For running frontend server in the same folder execute command:
yarn start

To test if everything is working go to localhost:3000