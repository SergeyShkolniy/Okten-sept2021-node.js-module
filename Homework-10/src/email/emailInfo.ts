import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.REGISTRATION]: {
        subject: 'REGISTRATION: welcome to september 2021',
        templateName: 'emailRegistration',
    },
    [emailActionEnum.LOGIN]: {
        subject: 'LOGIN: welcome to account',
        templateName: 'emailLogin',
    },
    [emailActionEnum.LOGOUT]: {
        subject: 'LOGOUT: good bay is september 2021',
        templateName: 'emailLogout',
    },

};
