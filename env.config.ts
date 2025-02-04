import { z } from 'zod';

// Definir el esquema de validación usando zod
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']).default("development"),
    DATABASE_URL: z.string().url().nonempty(),
    DIRECT_URL: z.string().url().nonempty(),
    NEXT_PUBLIC_APP_URL: z.string().url().nonempty(),
    NEXT_PUBLIC_TEST_USER_EMAIL: z.string().email().default("test@test.com"),
    NEXT_PUBLIC_TEST_USER_PASSWORD: z.string().default("password"),
    EMAIL_HOST: z.string().default("store-POS <service-email@resend.dev"),
    AUTH_SECRET: z.string().nonempty(),
    RESEND_API_KEY: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
});

// Validar las variables de entorno
const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('Invalid environment variables:', env.error.format());
    throw new Error('Invalid environment variables');
}

// Exportar las variables de entorno validadas como constantes
export const {
    NODE_ENV,
    NEXT_PUBLIC_NODE_ENV,
    DATABASE_URL,
    DIRECT_URL,
    NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_TEST_USER_EMAIL,
    NEXT_PUBLIC_TEST_USER_PASSWORD,
    RESEND_API_KEY,
    EMAIL_HOST,
    AUTH_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = env.data;