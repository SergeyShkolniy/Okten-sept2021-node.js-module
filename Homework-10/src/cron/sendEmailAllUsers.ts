import cron from 'node-cron';

import { userRepository } from '../repositories';
import { emailService } from '../services';
import { EmailActionEnum } from '../email';

export const sendEmailAllUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('sendEmailAllUsers');

        const allUsers = await userRepository.sendEmailAllUsers();

        await Promise.allSettled(allUsers.map(async (user) => emailService.sendMail(
            user.email,
            EmailActionEnum.ALL_USERS,
            { firstName: user.firstName },
        )));
    });
};
