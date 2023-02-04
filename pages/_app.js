import "../styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      {pageProps.NODE_ENV === "development" ? (
        ""
      ) : (
        <>
          <Script
            strategy="beforeInteractive"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522"
            crossOrigin="anonymous"
          />
          <Script
            type="text/javascript"
            src="//wcs.naver.net/wcslog.js"
            strategy="beforeInteractive"
          />
          <Script type="text/javascript">{`
            if(!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "18cf866f0226840";
              if(window.wcs) {
               wcs_do();
            }
          `}</Script>
          <Script async type="text/javascript" strategy="beforeInteractive">
            {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NTT2V8R');
      `}
          </Script>
          <Script defer type="text/javascript" strategy="beforeInteractive">
            {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "feybr6kyxk");`}
          </Script>

          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js"
            strategy="beforeInteractive"
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}
