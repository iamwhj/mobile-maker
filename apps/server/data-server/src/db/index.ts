import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connectDB = () => {
    const { DB_NAME, DB_ADDRESS, DB_PORT } = process.env
    const path = `mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`
    mongoose.connect(path, {
        connectTimeoutMS: 1000,
    }).then(() => {
        console.log('mongodb connect success!')
    }, err => {
        console.log('mongodb connect error!', err)
    })
}

export default connectDB