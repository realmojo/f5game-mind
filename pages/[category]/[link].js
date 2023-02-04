import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Layout, Col, Row } from "antd";
import { useRouter } from "next/router";
import { AdsenseStart } from "../../components/Adsense/AdsenseStart";
import { HeadComponent } from "../../components/Head";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { TestList } from "../../components/TestList";
export default function CategoryMain({
  category,
  item,
  recentlyItems,
  popularItems,
}) {
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
          canonicalUrl={`https://mindpang.com/${item.category}/${item.link}`}
        />
        {/* <div
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
        ></div> */}
        <main className="test-main relative">
          <Header category={category} />
          <Layout className="test-layout">
            <Row>
              <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                <div className="test-logo">
                  <h1>{item.title}</h1>
                  <img
                    src={item.logo}
                    style={{ width: "100%", marginBottom: 10 }}
                    alt={item.link}
                  />
                  <p>{item.description}</p>
                  <div className="mt-2 input-button-wrap">
                    <div className="mb-2 name-input">
                      <Input
                        size="large"
                        placeholder="이름 혹은 별칭을 입력해주세요."
                        value={name}
                        onChange={onChangeName}
                      />
                    </div>
                    {/* <AdsenseStart slotId={item.adsenses.main} /> */}
                    <div className="text-center pt-2">
                      <a href={`/play/${item.link}`}>
                        <Button type="primary" className="btn-start">
                          시작하기
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                <Sidebar
                  recentlyItems={recentlyItems}
                  popularItems={popularItems}
                />
              </Col>
            </Row>
            <div className="mt-6">
              <h2 className="px-2 text-xl font-bold">
                👉 다른 테스트 하러가기
              </h2>
              <TestList />
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
        category: item.category,
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
  const { category, link } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/getTestByLink.php?link=${link}`
  );

  const r = await axios.get(
    `${process.env.BASE_API_URL}/test/list/recentlyTest.php`
  );
  const p = await axios.get(
    `${process.env.BASE_API_URL}/test/list/popularTest.php`
  );

  return {
    props: {
      category,
      item: res.data,
      recentlyItems: r.data,
      popularItems: p.data,
      NODE_ENV: process.env.NODE_ENV,
    },
  };
};
