import cron from 'node-cron';
import { updateExpiredJobs } from './job.action';

cron.schedule('0 * * * *', async () => {
  try {
    await updateExpiredJobs();
  } catch (error) {
    console.error('Error updating expired jobs:', error);
  }
});
