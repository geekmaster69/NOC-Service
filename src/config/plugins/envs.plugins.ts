import 'dotenv/config';

import * as env from 'env-var';


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SCRET_KEY: env.get('MAILER_SCRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
}