import { startAuthTokenCronJob } from '@/actions/skills.cron';

let isCronJobRunning = false;

function startCronjobWithFlag() {
  if (!isCronJobRunning) {
    isCronJobRunning = true;
    startAuthTokenCronJob();
  }
}
startCronjobWithFlag();
