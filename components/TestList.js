import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";
import Link from "next/link";

const { Meta } = Card;

export const TestList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://f5game.co.kr/api/test/list/`);
      setList(res.data);
    })();
  }, []);

  return (
    <Row className="mt-4 mb-24 px-2" gutter={[8, 8]}>
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
            <Link href={`/main/${item.link}`}>
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
                <Meta title={<h2 className="text-sm">{item.title}</h2>} />
              </Card>
            </Link>
          </Col>
        ))}
    </Row>
  );
};
