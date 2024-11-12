import React from "react";

type Props = {
  buttonText?: string;
  buttonLink?: string;
};

export function CallToAction({
  buttonText = "Call to Action",
  buttonLink = "#",
}: Props) {
  return (
    <table
      role="presentation"
      border={0}
      cellPadding="0"
      cellSpacing="0"
      style={{
        margin: "20px auto",
        textAlign: "center",
        width: "100%",
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <a
              href={buttonLink}
              style={{
                backgroundColor: "#0073e6",
                color: "#ffffff",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "16px",
                fontWeight: "bold",
                lineHeight: "1.5",
                padding: "12px 24px",
                textDecoration: "none",
                borderRadius: "5px",
                display: "inline-block",
                width: "100%",
                maxWidth: "200px",
              }}
            >
              {buttonText}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
