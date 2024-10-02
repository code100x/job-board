'use server';
/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import { bearerToken } from '@/config/skillapi.auth.token';

var cron = require('node-cron');

let isCronJobRunning = false;
const url = 'https://auth.emsicloud.com/connect/token';

export async function startAuthTokenCronJob() {
  // don't run the cron job if its already running
  if (!isCronJobRunning) {
    isCronJobRunning = true;
    fetchAuthTokenCronJob();
    // Schedule the cron to run every 45 minutes , the token resets after one hour
    cron.schedule('*/45 * * * *', async () => {
      await fetchAuthTokenCronJob();
    });

    console.log('Auth token cron job started.');
    return NextResponse.json({ data: 'Success', status: 200 });
  } else {
    console.log('Auth token cron job is already running.');
    return NextResponse.json({ data: 'Already running', status: 200 });
  }
}

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    client_id: process.env.LIGHTCAST_CLIENT_ID ?? '',
    client_secret: process.env.LIGHTCAST_CLIENT_SECRET ?? '',
    grant_type: 'client_credentials',
    scope: 'emsi_open',
  }),
};

async function fetchAuthTokenCronJob() {
  console.log('Fetching updated Lightcast token at ' + new Date());
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    bearerToken.value = data.access_token;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getBearerToken() {
  return bearerToken.value;
}
