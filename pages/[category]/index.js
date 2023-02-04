import React, { useState } from "react";
import { Layout, Card, Col, Row, Button, notification } from "antd";
import { Header } from "../../components/Header";
import Link from "next/link";
import axios from "axios";
import { Footer } from "../../components/Footer";
import { Sidebar } from "../../components/Sidebar";
import { HeaderMain } from "../../components/HeadMain";

const { Meta } = Card;

export default function Category({
  testItems,
  NODE_ENV,
  category,
  recentlyItems,
  popularItems,
  BASE_API_URL,
}) {
  const [api, contextHolder] = notification.useNotification();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(testItems);
  const openNotification = () => {
    api.info({
      message: `마지막 테스트 입니다.`,
      placement: "bottom",
      duration: 2,
    });
  };
  const doMoreItem = async () => {
    const { data } = await axios.get(
      `${BASE_API_URL}/test/list/?category=${category}&page=${page}`
    );
    if (data.length !== 0) {
      setPage(page + 1);
      setItems([...items, ...data]);
    } else {
      openNotification();
    }
  };
  return (
    <>
      <HeaderMain />
      <main>
        {contextHolder}
        <Header NODE_ENV={NODE_ENV} items={items} category={category} />
        <Layout className="site-layout">
          <Row>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
              <Row
                className="pt-4 pb-4 px-2"
                gutter={[8, 8]}
                style={{ marginLeft: 0, marginRight: 0 }}
              >
                {items.map((item, key) => (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={8}
                    xxl={8}
                    key={key}
                    className="pb-2"
                  >
                    <Link
                      href={`/${item.category}/${item.link}`}
                      target="_blank"
                    >
                      <Card
                        hoverable
                        size="small"
                        height={400}
                        cover={<img alt={item.title} src={item.logo} />}
                      >
                        <Meta
                          title={<h2 className="text-sm py-2">{item.title}</h2>}
                        />
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
              <div className="text-center mb-4">
                <Button
                  className="btn-mindpang"
                  size="large"
                  onClick={() => doMoreItem()}
                >
                  더보기
                </Button>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <Sidebar
                recentlyItems={recentlyItems}
                popularItems={popularItems}
              />
            </Col>
          </Row>
        </Layout>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { category } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/list/?category=${category}`
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
      testItems: res.data,
      recentlyItems: r.data,
      popularItems: p.data,
      NODE_ENV: process.env.NODE_ENV,
      BASE_API_URL: process.env.BASE_API_URL,
    },
  };
};
