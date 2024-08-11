import React from "react";

import { styles } from "../style";
interface TemplateProps {
  token: string;
  url: string;
}
export const OTPTemplate = ({ token, url }: TemplateProps) => {
  return (
    <div style={styles.container}>
      <p style={styles.greetings}>Hello,</p>
      <p style={styles.textWithMargin}>
        Your OTP is <b>{token}</b>. This OTP is valid for XY minutes.
      </p>
      <p style={styles.salutation}>
        Best,
        <br />
        100xJobs
      </p>
      <p style={styles.unsubscribe}>
        <a href={url}>Unsubscribe</a>
      </p>
    </div>
  );
};
