export default ({ env }) => ({
    upload: {
        config: {
            breakpoints: {
                xlarge: 1920,
                large: 1000,
                medium: 750,
                small: 500,
                xsmall: 300
            },
            sizeLimit: 250 * 1024 * 1024 // 250MB
        },
    },
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', ''),
                port: env('SMTP_PORT', 587),
                secure: env.bool('SMTP_SECURE', false),
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
                requireTLS: env.bool('SMTP_REQUIRE_TLS', true),
                ignoreTLS: env.bool('SMTP_IGNORE_TLS', false),
                tls: {
                    rejectUnauthorized: env.bool('SMTP_TLS_REJECT_UNAUTHORIZED', false),
                    minVersion: env('SMTP_TLS_MIN_VERSION', 'TLSv1.2'),
                    maxVersion: env('SMTP_TLS_MAX_VERSION', 'TLSv1.3'),
                    ciphers: env('SMTP_TLS_CIPHERS', 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA')
                },
                connectionTimeout: env.int('EMAIL_TIMEOUT', 30000),
                socketTimeout: env.int('EMAIL_TIMEOUT', 30000),
                greetingTimeout: env.int('EMAIL_TIMEOUT', 30000),
                debug: env.bool('EMAIL_DEBUG', false),
                logger: env.bool('EMAIL_LOGGER', true)
            },
            settings: {
                defaultFrom: env('SMTP_DEFAULT_FROM'),
                defaultReplyTo: env('SMTP_DEFAULT_REPLY_TO'),
            },
        },
    }
});
