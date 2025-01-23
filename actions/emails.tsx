import { resend, domain, fromEmail } from "@/lib/email";
import { generateEmailHtml } from "@/components/emails/template";

// Funciones de envío de correo

//*AUTH

export const sendTwoFactorTokenEmail = async (
  email: string,

  token: string
): Promise<void> => {
  try {
    const emailHtml = generateEmailHtml({
      title: "2FA Token",
      description: "Your 2FA token is:",
      token,
    });
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "2FA token",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending 2FA token email:", error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    const emailHtml = generateEmailHtml({
      title: "Reset your password",
      description: "Click the button below to reset your password.",
      link: resetLink,
      linkText: "Reset Password",
    });
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Reset your password",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    const emailHtml = generateEmailHtml({
      title: "Confirm your email",
      description: "Click the button below to confirm your email.",
      link: confirmLink,
      linkText: "Confirm Email",
    });
    const res = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Confirm your email",
      html: emailHtml,
    });
    console.log("🦇  res:", res);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

//*MEMBERS

export const sendInvitation = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    const inviteLink = `${domain}/invitation?token=${token}`;
    const emailHtml = generateEmailHtml({
      title: "You've been invited to join the team",
      description:
        "You've been invited to join the team. Click the button below to accept the invitation.",
      link: inviteLink,
      linkText: "Accept Invitation",
    });
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "You've been invited to join the team",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending invite member email:", error);
  }
};
