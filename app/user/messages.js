const i18n = require('../../settings/i18');

const m = () => {
    return {
        hi: i18n.__('hey money'),
        server_error: i18n.__('Server Error'),
        wrong_login: i18n.__('Email or Password wrong'),
        email_taken: i18n.__('This email already token'),
        register_suc: i18n.__('Register successfully')
    }
};

module.exports = {
    message: m
};
