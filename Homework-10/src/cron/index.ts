import { sendEmailAllUsers } from './sendEmailAllUsers';

export const cronRun = () => {
    console.log('cronRun started');
    sendEmailAllUsers();
};
