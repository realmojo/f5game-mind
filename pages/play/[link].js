import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Layout, Radio, Space } from "antd";
import { HeadComponent } from "../../components/Head";
import { AdsensePlay } from "../../components/Adsense/AdsensePlay";
import { ResultLoading } from "../../components/ResultLoading";

const offsets = [0, 1, 2, 3];
export default function Play({ item }) {
  const contentLength = item.contents.length;
  const [current, setCurrent] = useState(0);
  const [testAnswer, setTestAnswer] = useState([]);
  const [isResultLoading, setIsResultLoading] = useState(false);
  const onChangeTestAnswer = (index, value) => {
    let newArr = [...testAnswer];
    newArr[index] = value;
    localStorage.setItem("f5game-test-answer", JSON.stringify(newArr));
    setTestAnswer(newArr);
  };

  const doNext = (index) => {
    if (testAnswer[index] === undefined) {
      alert("문항을 선택해 주세요");
      return;
    }
    const nextValue = index + 1;
    if (nextValue === item.contents.length) {
      setIsResultLoading(true);
    } else {
      setCurrent(nextValue);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    localStorage.setItem("f5game-test-content-type", item.type);
  }, []);

  return (
    <>
      <HeadComponent
        item={item}
        canonicalUrl={`https://test.f5game.co.kr/play/${item.link}`}
      />
      <main className="test-main">
        <Layout className="test-layout">
          {isResultLoading ? (
            <ResultLoading
              item={item}
              testAnswer={testAnswer}
              slotId={item.adsenses.loading}
            />
          ) : (
            <div>
              {offsets.map((offset) => (
                <div className="test-item mb-4">
                  {item.contents[Number(current) + Number(offset)].title.url ? (
                    <div>
                      <img
                        className="test-play-img"
                        src={
                          item.contents[Number(current) + Number(offset)].title
                            .url
                        }
                        alt={
                          item.contents[Number(current) + Number(offset)].title
                            .text
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="test-play-title">
                    {Number(current) + Number(offset) + 1}.{" "}
                    {item.contents[Number(current) + Number(offset)].title.text}
                  </div>
                  <Radio.Group
                    onChange={(e) =>
                      onChangeTestAnswer(
                        Number(current) + Number(offset),
                        e.target.value
                      )
                    }
                    value={testAnswer[Number(current) + Number(offset)]}
                  >
                    <Space size={0} direction="vertical">
                      {item.contents[
                        Number(current) + Number(offset)
                      ].questions.map((question, _index) => {
                        return (
                          <Radio
                            className="test-play-radio"
                            key={`${
                              Number(current) + Number(offset)
                            }-${_index}`}
                            value={_index}
                          >
                            {question.text}
                          </Radio>
                        );
                      })}
                    </Space>
                  </Radio.Group>

                  {(Number(current) + Number(offset)) % 4 === 3 ||
                  Number(current) + Number(offset) === contentLength ? (
                    <div className="my-3">
                      <div className="mt-2">
                        <AdsensePlay slotId={item.adsenses.play} />
                      </div>
                      <div className="text-center mt-4">
                        <Button
                          type="primary"
                          className="btn-start"
                          onClick={() =>
                            doNext(Number(current) + Number(offset))
                          }
                        >
                          다음
                        </Button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const { link } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/getTestContentByLink.php?link=${link}`
  );

  return { props: { item: res.data, NODE_ENV: process.env.NODE_ENV } };
};
