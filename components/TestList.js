import React, { useState, useEffect } from "react";
import { Card, Col, Row, notification, Button } from "antd";
import axios from "axios";
import Link from "next/link";
const { Meta } = Card;

const BASE_API_URL = "https://f5game.co.kr/api";

export const TestList = () => {
  const [api, contextHolder] = notification.useNotification();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const openNotification = () => {
    api.info({
      message: `마지막 테스트 입니다.`,
      placement: "bottom",
      duration: 2,
    });
  };

  const doMoreItem = async () => {
    const { data } = await axios.get(`${BASE_API_URL}/test/list/?page=${page}`);
    if (data.length !== 0) {
      setPage(page + 1);
      setList([...list, ...data]);
    } else {
      openNotification();
    }
  };
  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://f5game.co.kr/api/test/list/`);
      setList(res.data);
    })();
  }, []);

  return (
    <React.Fragment>
      {contextHolder}
      <Row className="mt-4 px-2" gutter={[8, 8]}>
        {list.length > 0 &&
          list.map((item, key) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              xxl={8}
              key={key}
              className="pb-6"
            >
              <Link href={`/${item.category}/${item.link}`}>
                <Card
                  hoverable
                  size="small"
                  height={400}
                  cover={
                    <img
                      alt={item.title}
                      src={item.logo}
                      width={320}
                      height={320}
                    />
                  }
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
    </React.Fragment>
  );
};
