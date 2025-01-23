import { Resend } from 'resend';
import { RESEND_API_KEY, NEXT_PUBLIC_APP_URL, EMAIL_HOST } from '@/env.config';

export const resend = new Resend(RESEND_API_KEY);

export const domain = NEXT_PUBLIC_APP_URL
export const fromEmail = EMAIL_HOST