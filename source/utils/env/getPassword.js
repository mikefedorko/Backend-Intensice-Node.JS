import { ValidationError } from '../errors';

export const getPassword = () => {
    const PASSWORD  = process.env.PASSWORD || 'Njwh3@rhfh#';

    if (!PASSWORD) {
        throw new ValidationError('Environment variable AUTH_PASS should be specified');
    }

    const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(PASSWORD);

    if (!isValid) {
        throw new ValidationError(
            'Environment variable PASSWORD should have a minimum eight characters, at least one letter, one number and one special character',
        );
    }

    return PASSWORD;
};

