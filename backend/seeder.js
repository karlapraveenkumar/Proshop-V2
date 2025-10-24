import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);

        const adminUser = createdUser[0]._id;

        const sampleProducts = products.map(product=>{
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();

    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.error("Data destryoed!".red.inverse);
        process.exit();

    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}

// console.log(process.argv); //Run it using node backend/seeder -d   but everything inside the seeder should be commented except this console  
//output will be like
/*[
  'C:\\Program Files\\nodejs\\node.exe',
  'H:\\Proshop-V2\\backend\\seeder',    
  '-d'
]*/