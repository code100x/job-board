// lib/cron.ts
import cron from 'node-cron';
import { deleteOldDeltedJobs, updateExpiredJobs } from './job.action';

let cronJobInitialized = false;

export const startCronJob = () => {
  if (!cronJobInitialized) {
    cronJobInitialized = true;

    // Schedule the job to run at midnight (12:00 AM) every day
    cron.schedule('0 0 * * *', async () => {
      try {
        await updateExpiredJobs();
        await deleteOldDeltedJobs();
      } catch (error) {
        console.error('Error updating expired jobs:', error);
      }
    });
  }
};
