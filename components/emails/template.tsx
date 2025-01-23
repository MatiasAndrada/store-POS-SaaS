// Tipos para los parámetros
interface EmailTemplateProps {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  token?: string;
}

// Función para generar el HTML
export const generateEmailHtml = ({
  title,
  description,
  link,
  linkText,
  token,
}: EmailTemplateProps): string => {
  return `
    <html>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <table role="presentation" style="width: 100%; height: 100vh; background: radial-gradient(ellipse at top, skyblue, darkblue); border-collapse: collapse;">
          <tr>
            <td style="text-align: center; vertical-align: middle;">
              <table role="presentation" style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); margin: 0 auto; max-width: 400px; width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                    </svg>
                    <h1 style="font-size: 24px; font-weight: bold; color: #333;">Project Admin</h1>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <h2 style="font-size: 20px; font-weight: bold; margin: 10px 0;">${title}</h2>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">${description}</p>
                    ${
                      token
                        ? `<p style="font-size: 18px; color: red;"><strong>${token}</strong></p>`
                        : ""
                    }
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    ${
                      link
                        ? `<a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: bold;">${linkText}</a>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
