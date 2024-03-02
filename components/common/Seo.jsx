import Head from "next/head";

const Seo = ({ pageTitle }) => (
  <>
    <Head>
      <title>
        {pageTitle &&
          `${pageTitle} || Hubjob`}
      </title>

    </Head>
  </>
);

export default Seo;
