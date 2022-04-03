import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.REGISTRATION]: {
        subject: 'REGISTRATION: welcome to september 2021',
        templateName: 'emailRegistration',
    },
    [EmailActionEnum.LOGIN]: {
        subject: 'LOGIN: welcome to account',
        templateName: 'emailLogin',
    },
    [EmailActionEnum.LOGOUT]: {
        subject: 'LOGOUT: good bay is september 2021',
        templateName: 'emailLogout',
    },
    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'FORGOT_PASSWORD: FORGOT_PASSWORD',
        templateName: 'emailForgotPassword',
    },

};
