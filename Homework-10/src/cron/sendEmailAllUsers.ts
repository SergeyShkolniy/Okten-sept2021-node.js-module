import cron from 'node-cron';

import { userRepository } from '../repositories';
import { emailService } from '../services';
import { EmailActionEnum } from '../email';

export const sendEmailAllUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('sendEmailAllUsers');
        const allUsers = await userRepository.sendEmailAllUsers();
        Promise.all(allUsers).then((results) => results
            .forEach((result) => emailService
                .sendMail(
                    result.email,
                    EmailActionEnum.ALL_USERS,
                    {
                        firstName: result.firstName,
                    },
                )));
    });
};
