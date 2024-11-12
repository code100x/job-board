import { createTransport, Transporter } from 'nodemailer';

import renderEmail from './renderEmail';
import { emailError} from './utils/error';
import { validateEmailOptions } from '../validators/email.validator';
import { formatRecipients } from './utils/format';
import { EmailConfig, SendEmailOptions, EmailProps } from '../../types/email.types';

// Private state
let transporter: Transporter | null = null;
let initialized = false;


// Private functions
const initialize = async (config: EmailConfig): Promise<void> => {
  if (initialized) return;

  transporter = createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  try {
    await transporter.verify();
    initialized = true;
  } catch (error) {
    throw emailError(
      'SMTP_VERIFICATION_FAILED',
      'Failed to verify SMTP connection',
      { error }
    );
  }
};

// Main functions
export const sendEmail = async (
  config: EmailConfig,
  options: SendEmailOptions
): Promise<any> => {
  await initialize(config);

  try {
    // Validate email options
    const errors = validateEmailOptions({
      ...options,
      from: {
        email: config.from.email,
        name: config.from.name,
      },
    });

    if (errors.length > 0) {
      throw emailError(
        'VALIDATION_ERROR',
        `Invalid email options: ${errors.join(', ')}`
      );
    }

    // Render email template
    const html = await renderEmail(options.template, options.props);

    // Prepare email options
    const mailOptions = {
      from: `"${config.from.name}" <${config.from.email}>`,
      to: formatRecipients.normalize(options.to),
      cc: formatRecipients.normalize(options.cc),
      bcc: formatRecipients.normalize(options.bcc),
      replyTo: config.replyTo,
      subject: options.subject,
      text: options.text,
      html,
      attachments: options.attachments,
      priority: options.priority || 'normal',
    };

    // Send email with retry mechanism
    // const info = await retry(
    //   () => transporter!.sendMail(mailOptions),
    //   config
    // );
    const info = await transporter!.sendMail(mailOptions);

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      pending: info.pending,
      response: info.response,
    };
  } catch (error) {
    if (error instanceof emailError) {
      throw error;
    }

    throw emailError('EMAIL_SEND_FAILED', 'Failed to send email', {
      error,
      options,
    });
  }
};

// export const sendTestEmail = async (
//   config: EmailConfig,
//   to: string
// ): Promise<any> => {
//   return sendEmail(config, {
//     to,
//     subject: 'Test Email',
//     template: 'test',
//     props: {
//       timestamp: new Date().toISOString()
//     }
//   });
// };

export const checkConnection = async (
  config: EmailConfig
): Promise<boolean> => {
  try {
    await initialize(config);
    return true;
  } catch (error) {
    return false;
  }
};

// Create default config
const defaultConfig: EmailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASSWORD!,
  },
  from: {
    name: process.env.EMAIL_USERNAME!,
    email: process.env.EMAIL_USER!,
  },
  replyTo: process.env.EMAIL_REPLY_TO,
};

// Export configured functions
export const configuredSendEmail = (options: SendEmailOptions) =>
  sendEmail(defaultConfig, options);

// export const configuredSendTestEmail = (to: string) =>
//   sendTestEmail(defaultConfig, to);

export const configuredCheckConnection = () => checkConnection(defaultConfig);

export default {
  sendEmail: configuredSendEmail,
  // sendTestEmail: configuredSendTestEmail,
  checkConnection: configuredCheckConnection,
};
