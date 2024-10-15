const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static async getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    return res.status(200).json({
      redis: redisStatus,
      db: dbStatus,
    });
  }

  static async getStats(req, res) {
    try {
      const nbUsers = await dbClient.nbUsers();
      const nbFiles = await dbClient.nbFiles();

      return res.status(200).json({
        users: nbUsers,
        files: nbFiles,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Unable to fetch stats' });
    }
  }
}

module.exports = AppController;
