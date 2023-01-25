import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Layout } from "antd";
import { useRouter } from "next/router";
import { AdsenseStart } from "../../components/Adsense/AdsenseStart";
import { HeadComponent } from "../../components/Head";

export default function Main({ item }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const onChangeName = (e) => {
    localStorage.setItem("f5game-test-name", e.target.value);
    setName(e.target.value);
  };
  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <HeadComponent
          item={item}
          canonicalUrl={`https://mindpang.com/main/${item.link}`}
        />
        <div
          className="test-main-background"
          style={{
            backgroundColor: "transparent",
            backgroundImage: `url(${item.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 300,
            width: "100%",
            position: "absolute",
          }}
        ></div>
        <main className="test-main relative">
          <Layout className="test-layout">
            <div className="test-logo">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <div className="mb-2 name-input">
                <Input
                  size="large"
                  placeholder="이름 혹은 별칭을 입력해주세요."
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <AdsenseStart slotId={item.adsenses.main} />
              <div className="text-center pt-2">
                <a href={`/play/${item.link}`}>
                  <Button type="primary" className="btn-start">
                    시작하기
                  </Button>
                </a>
              </div>
            </div>
          </Layout>
        </main>
      </>
    );
  }
}

export const getStaticPaths = async () => {
  const { data } = await axios.get(
    `${process.env.BASE_API_URL}/test/getTests.php`
  );
  const paths = [];
  for (const item of data) {
    paths.push({
      params: {
        link: item.link,
      },
    });
  }
  return {
    paths,
    fallback: true,
  };
};

// export const getServerSideProps = async ({ req, params }) => {
export const getStaticProps = async ({ req, params }) => {
  const { link } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/getTestByLink.php?link=${link}`
  );

  return { props: { item: res.data, NODE_ENV: process.env.NODE_ENV } };
};
