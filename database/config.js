const mongoose = require('mongoose');


const dbConection = async()=>{
    try {
      await mongoose.connect(process.env.MONGODB_CNN);
      console.log('Bases de datos OnLine');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos')
    }
}
module.exports ={
    dbConection
} 