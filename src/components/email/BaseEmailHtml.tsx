/* eslint-disable @next/next/no-head-element */
import BaseTable from './BaseTable';
import EmailBodyLogo from './EmailBodyLogo';
import EmailHead from './EmailHead';

import RawHtml from './RawHtml';
import Row from './Row';

const Html = (props: { children: React.ReactNode }) => (
  <>
    <RawHtml html="<!doctype html>" />
    <html>{props.children}</html>
  </>
);

export const BaseEmailHtml = (props: {
  children: React.ReactNode;
  subject: string;
}) => {
  return (
    <Html>
      <EmailHead title={props.subject} />
      <body style={{ wordSpacing: 'normal', backgroundColor: '#F3F4F6' }}>
        <div style={{ backgroundColor: '#F3F4F6' }}>
          <RawHtml
            html={`<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->`}
          />

          {/* Header with logo and platform name */}
          <div
            style={{
              margin: '0px auto',
              maxWidth: 600,
              textAlign: 'center',
              padding: '20px 0',
            }}
          >
            <EmailBodyLogo />
          </div>

          {/* Main Content */}
          <div
            style={{
              margin: '0px auto',
              maxWidth: 600,
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              padding: '2px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <RawHtml
              html={`<!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" className="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->`}
            />
            <div
              style={{
                background: '#FFFFFF',
                backgroundColor: '#FFFFFF',
                margin: '0px auto',
                maxWidth: 600,
              }}
            >
              <Row
                align="center"
                border={0}
                style={{
                  background: '#FFFFFF',
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                }}
              >
                <td
                  style={{
                    direction: 'ltr',
                    fontSize: 0,
                    padding: 0,
                    textAlign: 'center',
                  }}
                >
                  <RawHtml
                    html={`<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td className="" style="vertical-align:top;width:598px;" ><![endif]-->`}
                  />
                  <div
                    className="mj-column-per-100 mj-outlook-group-fix"
                    style={{
                      fontSize: 0,
                      textAlign: 'left',
                      direction: 'ltr',
                      display: 'inline-block',
                      verticalAlign: 'top',
                      width: '100%',
                    }}
                  >
                    <Row
                      border={0}
                      style={{ verticalAlign: 'top' }}
                      width="100%"
                    >
                      <td
                        align="center"
                        style={{
                          fontSize: 0,
                          padding: '10px 25px',
                          wordBreak: 'break-word',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontSize: 16,
                            fontWeight: 500,
                            lineHeight: 1.5,
                            textAlign: 'center',
                            color: '#101010',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          {props.children}
                        </div>
                      </td>
                    </Row>
                  </div>
                  <RawHtml html="<!--[if mso | IE]></td></tr></table><![endif]-->" />
                </td>
              </Row>
            </div>
          </div>

          {/* Footer with logo, address, social links, and privacy policy */}
          <div
            style={{
              margin: '0px auto',
              maxWidth: 600,
              textAlign: 'center',
              padding: '20px 0',
              color: '#6B7280',
              fontFamily: 'Helvetica, Arial, sans-serif',
            }}
          >
            <EmailBodyLogo />
            <BaseTable>
              <p>1234 Example Street, Suite 100, City, State, Zip</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                <a
                  href="https://facebook.com"
                  style={{ color: '#6B7280', textDecoration: 'none' }}
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  style={{ color: '#6B7280', textDecoration: 'none' }}
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  style={{ color: '#6B7280', textDecoration: 'none' }}
                >
                  Instagram
                </a>
              </div>
              <p style={{ marginTop: '10px' }}>
                <a
                  href="/privacy-policy"
                  style={{ color: '#6B7280', textDecoration: 'underline' }}
                >
                  Privacy Policy
                </a>
              </p>
            </BaseTable>
          </div>

          <RawHtml html="<!--[if mso | IE]></td></tr></table><![endif]-->" />
        </div>
      </body>
    </Html>
  );
};
