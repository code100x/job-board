import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface JobNotificationEmailProps {
    jobTitle: string;
    company: string;
    jobId: number;
    baseUrl: string;
}

const JobNotificationEmail: React.FC<JobNotificationEmailProps> = ({
    jobTitle,
    company,
    jobId,
    baseUrl,
}) => (
    <Html>
        <Head />
        <Preview>New job posting at {company}: {jobTitle}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/static/logo.png`}
                    width="32"
                    height="32"
                    alt="Company Logo"
                />
                <Text style={title}>
                    A new job has been posted at <strong>{company}</strong>!
                </Text>
                <Section style={section}>
                    <Text style={text}>
                        Job Title: <strong>{jobTitle}</strong>
                    </Text>
                    <Text style={text}>
                        Click the link below to apply for the job:
                    </Text>
                    <Button style={button} href={`${baseUrl}/jobs/apply/${jobId}`}>
                        Apply for the job
                    </Button>
                </Section>
                <Text style={links}>
                    <Link style={link}>View all jobs</Link> ・{" "}
                    <Link style={link}>Contact support</Link>
                </Text>
                <Text style={footer}>
                    100xdevs Job Portal ・ Some Address ・ Some City, Some State, Some Country
                </Text>
            </Container>
        </Body>
    </Html>
);

export default JobNotificationEmail;

const main = {
    backgroundColor: "#ffffff",
    color: "#24292e",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px 0 48px",
};

const title = {
    fontSize: "24px",
    lineHeight: 1.25,
};

const section = {
    padding: "24px",
    border: "solid 1px #dedede",
    borderRadius: "5px",
    textAlign: "center" as const,
};

const text = {
    margin: "0 0 10px 0",
    textAlign: "left" as const,
};

const button = {
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    lineHeight: 1.5,
    borderRadius: "0.5em",
    padding: "12px 24px",
    textDecoration: 'none',
};

const links = {
    textAlign: "center" as const,
};

const link = {
    color: "#0366d6",
    fontSize: "12px",
};

const footer = {
    color: "#6a737d",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "60px",
};
