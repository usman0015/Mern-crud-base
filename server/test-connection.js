const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('🔍 Testing MongoDB connection...');
        console.log('📡 MONGO_URI:', process.env.MONGO_URI);
        
        // Try to connect
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('✅ Connected successfully!');
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Connection FAILED!');
        console.error('📝 Error message:', error.message);
        console.error('🔍 Error code:', error.code);
        console.error('🔍 Error name:', error.name);
        
        // Specific error handling
        if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 SOLUTION: MongoDB is not running locally');
            console.log('   - Start MongoDB: "net start MongoDB" (Windows)');
            console.log('   - Or use MongoDB Atlas instead');
        } else if (error.message.includes('Authentication failed')) {
            console.log('\n💡 SOLUTION: Wrong username or password');
            console.log('   - Check your MongoDB Atlas username/password');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('\n💡 SOLUTION: Wrong hostname or no internet');
            console.log('   - Check your connection string');
        } else if (error.message.includes('bad auth')) {
            console.log('\n💡 SOLUTION: Authentication failed');
            console.log('   - Reset password in MongoDB Atlas');
        } else if (error.message.includes('whitelist')) {
            console.log('\n💡 SOLUTION: IP not whitelisted');
            console.log('   - Go to MongoDB Atlas → Network Access');
            console.log('   - Add IP: 0.0.0.0/0');
        }
        
        process.exit(1);
    }
};

testConnection();