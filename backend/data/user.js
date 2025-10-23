import bcrypt from 'bcryptjs';

const users  = [
    {
        name : 'Admin User',
        email : 'admin@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : true
    },
    {
        name : 'Praveen Kumar',
        email : 'praveenkumar@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : false
    },
    {
        name : 'Karla Praveen',
        email : 'karlapraveen@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : false
    }
];

export default users;