import { BaseEmailHtml, CallToAction } from '@/components/email';

type ResetPasswordProps = {
  resetLink: string;
  userName?: string;
};

export function ResetPasswordEmail({
  resetLink,
  userName,
}: ResetPasswordProps) {
  return (
    <BaseEmailHtml subject="Reset Your Password">
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          color: '#333333',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px' }}
        >
          Hello {userName || 'there'}, reset your password
        </h1>
        <p style={{ marginBottom: '20px' }}>
          Click the button below to reset your password. If you did not request
          this, please ignore this email.
        </p>
        <CallToAction buttonLink={resetLink} buttonText="Reset Password" />
      </div>
    </BaseEmailHtml>
  );
}
