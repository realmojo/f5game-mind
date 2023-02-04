import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document(NODE_ENV) {
  return (
    <Html lang="en">
      <Head />
      <meta
        name="naver-site-verification"
        content="cfae9d48e4136a6cc0488f13e108a464fcd96305"
      />

      <meta
        name="google-site-verification"
        content="VvMMlxDsaibrAPB29RkBlph_fkpfGw92LPRxcYC0wrA"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="msvalidate.01" content="9D6C85394BA833AF09FFDD20770E7D56" />
      <meta name="robots" content="index,follow" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export const getServerSideProps = async () => {
  return { props: { NODE_ENV: process.env.NODE_ENV } };
};
