import { BaseEmailHtml, CallToAction } from '@/components/email';

type EmailVerificationProps = {
  confirmationLink: string;
  userName?: string;
};

export function EmailVerificationEmail({
  confirmationLink,
  userName,
}: EmailVerificationProps) {
  return (
    <BaseEmailHtml subject="Confirm Your Email">
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
          Hello {userName || 'there'}, please confirm your email!
        </h1>
        <p style={{ marginBottom: '20px' }}>
          Click the button below to verify your email and activate your account:
        </p>
        <CallToAction
          buttonLink={confirmationLink}
          buttonText="Confirm Email"
        />
      </div>
    </BaseEmailHtml>
  );
}
