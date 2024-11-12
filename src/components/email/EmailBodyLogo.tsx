import RawHtml from "./RawHtml";
import Row from "./Row";

const CommentIE = ({ html = "" }) => <RawHtml html={`<!--[if mso | IE]>${html}<![endif]-->`} />;

const EmailBodyLogo = () => {
  const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/main.png`;

  return (
    <div style={{ margin: "0 auto", maxWidth: 600, width: "100%" }}>
      <Row align="center" style={{ width: "100%" }}>
        <td
          style={{
            textAlign: "center",
            padding: "0",
            direction: "ltr",
            fontSize: "0px",
          }}
        >
          {/* Conditional Comment for Outlook */}
          <CommentIE html={`<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">`} />

          <div
            style={{
              fontSize: "0px",
              textAlign: "center",
              display: "inline-block",
              width: "100%",
              verticalAlign: "middle", // ensures horizontal centering
            }}
          >
            <Row style={{ verticalAlign: "top", width: "100%" }}>
              <td
                align="center"
                style={{
                  padding: "20px 0 32px", // Padding to balance layout visually
                  wordBreak: "break-word",
                  textAlign: "center", // Center content horizontally
                }}
              >
                <table
                  role="presentation"
                  style={{
                    borderCollapse: "collapse",
                    borderSpacing: "0",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <a href="https://job.vineet.tech" style={{ textDecoration: "none", color: "#000000", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                          src={imageUrl}
                          alt="Job Board Logo"
                          width="30"
                          height="30"
                          style={{
                            display: "inline-block",
                            maxWidth: "100%",
                            border: "0",
                            outline: "none",
                            marginRight: "8px", // Spacing between logo and name
                          }}
                        />
                        <span
                          style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "#000000",
                            lineHeight: "1.2",
                            fontFamily: "Helvetica, Arial, sans-serif",
                          }}
                        >
                          Job Board
                        </span>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </Row>
          </div>

          {/* Close Conditional Comment */}
          <CommentIE html="</td></tr></table>" />
        </td>
      </Row>
    </div>
  );
};

export default EmailBodyLogo;
