import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.REGISTRATION]: {
        subject: 'REGISTRATION: welcome to september 2021 ',
        html: 'Welcome. You have successfully passed registration',
    },
    [emailActionEnum.LOGIN]: {
        subject: 'LOGIN: welcome to account ',
        html: 'Welcome. You are logged into your account',
    },
    [emailActionEnum.LOGOUT]: {
        subject: 'LOGOUT: good bay is september 2021 ',
        html: 'Good bay. You are logged out of your account',
    },

};
