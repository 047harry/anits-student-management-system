import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/btech_student_portal';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000 // Quick 5s timeout instead of waiting 30s
    });
    
    const hostType = mongoUri.includes('mongodb.net') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB';
    console.log(`🚀 [Database] Connected successfully to ${hostType}: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`\n⚠️  [Database Notice] Could not connect to MongoDB: ${error.message}`);
    console.warn('👉 To connect your MongoDB Atlas Cloud database:');
    console.warn('   1. Open "server/.env"');
    console.warn('   2. Set MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/btech_student_portal?retryWrites=true&w=majority');
    console.warn('   3. Replace <username> and <password> with your MongoDB Atlas database user.\n');
    return false;
  }
};
