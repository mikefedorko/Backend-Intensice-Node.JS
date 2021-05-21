export const createUser = {
    type:       'object',
    properties: {
        name: {
            type:       'object',
            properties: {
                first: {
                    type: 'string',
                },
                last: {
                    type: 'string',
                },
            },
        },
        phones: {
            type:  'array',
            items: {
                properties: {
                    phone: {
                        type: 'string',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
            },
        },
        emails: {
            type:  'array',
            items: {
                properties: {
                    email: {
                        type: 'string',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
            },
        },
        password: {
            type: 'string',
        },
        sex: {
            type: 'string',
            enum: [ 'f', 'm' ],
        },
        roles: {
            type: [ 'string' ],
        },
        social: {
            type:       'object',
            properties: {
                facebook: {
                    type: 'string',
                },
                linkedin: {
                    type: 'string',
                },
                github: {
                    type: 'string',
                },
                skype: {
                    type: 'string',
                },
            },
        },
        notes: {
            type: 'string',
        },
        hash: {
            type: 'string',
        },
        disabled: {
            type: 'boolean',
        },
        created: {
            type:   'string',
            format: 'date',
        },
        modified: {
            type:   'string',
            format: 'date',
        },
    },
    required:             [ 'name', 'emails', 'phones', 'password', 'sex' ],
    additionalProperties: false,
};
