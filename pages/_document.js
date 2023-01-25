import { Html, Head, Main, NextScript } from "next/document";

export default function Document(NODE_ENV) {
  console.log(NODE_ENV.__NEXT_DATA__.buildId);
  // console.log(process.env);
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
      {NODE_ENV.__NEXT_DATA__.buildId === "development" ? (
        ""
      ) : (
        <>
          <script
            defer
            src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js"
          />
          <script
            defer
            type="text/javascript"
            src="//wcs.naver.net/wcslog.js"
          ></script>
          <script
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            if(!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "18cf866f0226840";
              if(window.wcs) {
               wcs_do();
            }
          `,
            }}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522"
            crossOrigin="anonymous"
          />
          <script
            async
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NTT2V8R');
      `,
            }}
          />
          <script
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "feybr6kyxk");`,
            }}
          />
        </>
      )}

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
