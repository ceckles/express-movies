const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("🗄️ Connected to database successfully 🗄️");
    }catch(error){
        console.error('❌ Error connecting to database ❌:', error.message);
        process.exit(1);
    }
}

const disconnectDB = async () =>{
    try{
        await prisma.$disconnect();
        console.log("🗄️ Disconnected from database successfully 🗄️");
    }catch(error){
        console.error('❌ Error disconnecting from database ❌:', error.message);
        process.exit(1);
    }
}

module.exports = { prisma, connectDB, disconnectDB };