import { BaseEmailHtml,CallToAction } from '@/components/email';

import React from 'react'

type Props = {}

export function WelcomeEmail({}: Props) {
  return (
    <BaseEmailHtml subject='Welcome to job board'>
         <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#333333",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    ><img src='https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg' alt='wellcom imgae'/>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 20px" }}>
      Welcome to Our Job Board! Discover exciting opportunities tailored to you.
      </h1>
      <CallToAction buttonText={"Search for jobs"} buttonLink={"https://job.vineet.tech/jobs"} />
    </div>
    </BaseEmailHtml>
  )
}