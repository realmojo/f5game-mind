import Head from "next/head";

export const HeadComponent = ({ item }) => {
  return (
    <Head>
      <title>{`${item.title} - 테스트모아`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="index, follow" />
      <meta charSet="utf-8" />
      <meta name="description" content={item.description} />
      <meta name="theme-color" content="#338ff1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href="https://test.f5game.co.kr" />
      <meta name="title" content={`${item.title} - 테스트모아`} />
      <meta name="plink" content="https://test.f5game.co.kr" />
      <meta name="description" content={item.description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://test.f5game.co.kr" />
      <meta property="og:article:author" content="F5game" />
      <meta property="og:site_name" content={`${item.title} - 테스트모아`} />
      <meta property="og:title" content={`${item.title} - 테스트모아`} />
      <meta property="og:description" content={item.description} />
      <meta
        property="og:image"
        content={
          item.logo
            ? item.logo
            : "https://f5game.s3.ap-northeast-2.amazonaws.com/f5game.png"
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@test.f5game.co.kr" />
      <meta name="twitter:title" content={`${item.title} - 테스트모아`} />
      <meta name="twitter:description" content={item.description} />
      <meta
        property="twitter:image"
        content={
          item.logo
            ? item.logo
            : "https://f5game.s3.ap-northeast-2.amazonaws.com/f5game.png"
        }
      />
      <link
        rel="apple-touch-icon"
        content={
          item.logo
            ? item.logo
            : "https://f5game.s3.ap-northeast-2.amazonaws.com/f5game.png"
        }
      />
    </Head>
  );
};
