const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Environment variables for MongoDB connection
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${host}:${port}`; // MongoDB connection URL

class DBClient {
  constructor() {
    // Initialize the MongoDB client
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;

    // Connect to the MongoDB server
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('MongoDB client connected to the server');
      })
      .catch((err) => {
        console.error(`MongoDB connection failed: ${err.message}`);
      });
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    return this.client.isConnected() && this.db !== null;
  }

  // Return the number of documents in the 'users' collection
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error(`Error fetching users count: ${error.message}`);
      return 0;
    }
  }

  // Return the number of documents in the 'files' collection
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error(`Error fetching files count: ${error.message}`);
      return 0;
    }
  }
}

// Export a single instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
