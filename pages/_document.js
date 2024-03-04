import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="keywords"
          content="	candidates, career, employment, indeed, job board, job listing, job portal, job postings, job search, job seeker, jobs, recruiters, recruiting, recruitment, resume"
        />

        <meta
          name="description"
          content="HubJob Company Limited is co-owned by three of our best friends who are passionate and have a strong interest in advertising, job posting, and application development. We support our clients and customers to have potential access to all types of careers and job prospects. Established on August 8th, 2023. Our main goal is to support private firms, INGOs, UN agencies, embassies in Laos, and all interested customers who intend to post job vacancies on their behalf to reach potential, qualifications, and other interest in applications from diverse industries."
        />
        <meta name="ibthemes" content="ATFN" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
