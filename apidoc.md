*GetAllUsers/ (GET)
> http://localhost:5000/api/auth/users

/*Register/ (POST)
> http://localhost:5000/api/auth/register (body) => {"name":"Kalu", "email":"kalu@gmail.com","password":"12345678","phone":343432,role?":"user"}

*Login (POST)
> http://localhost:5000/api/auth/login (body) => {"email":"kalu@gmail.com","password":"12345678"} (response)=> {auth:true,token:'dgsdg'}

/*UserInfo/ (GET)
> http://localhost:5000/api/auth/userinfo (Header) => {'x-access-token':'token value from login'}