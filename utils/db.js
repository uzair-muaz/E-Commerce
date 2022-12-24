import mongoose from 'mongoose';
const url = "mongodb+srv://Next-Tailwind-Amazona:Mua001!!!!@cluster0.llyxhsu.mongodb.net/next-tailwind-amazona?retryWrites=true&w=majority";
//connection is used to save the previous connection
const connection = {};

async function connect() {

    const test = require('dotenv').config()
    // console.log(process.env.MONGODB_URI);

    if (connection.isConnected) {
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('use previous connection');
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    console.log('new connection');
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('not disconnected');
        }
    }
}
function convertDocToObj(doc) {
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;