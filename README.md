ABIODUN BABAYODE
# thecoded 
# clone the project use https://github.com/ABIKEM01/thecoded.git
# cd to project directory 
# npm install to get the neccessary dependencies
# edit .envsample to .env to connect my mongodb account url
# on command prompt, type npm run dev to start the project

#you can register a user by visiting http://localhost:4000/api/v1/users/register 
parameter to register user by using postman. 
POST 
{
    "business_name":"abbey technolology",
    "email":"abbey@yahoo.com",
    "password":"12345"
}


#you can log in user by visiting http://localhost:4000/api/v1/users/login

POST
{
    "email":"abbey@yahoo.com",
    "password":"12345"
}

#you can get all users http://localhost:4000/api/v1/users
GET

#you can delete user by visiting http://localhost:4000/api/v1/users/delete/
NOTE only admin can delete user 
