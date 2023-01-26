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
    if (index < contentLength && testAnswer[index] === undefined) {
      alert("문항을 선택해 주세요");
      return;
    }

    // if (item.type === "score") {
    //   const nextValue = index + 1;
    //   if (index >= item.contents.length) {
    //     setIsResultLoading(true);
    //   } else {
    //     setCurrent(nextValue);
    //   }
    // } else if (item.type === "answer" || item.type === "random") {
    const nextValue = index + 1;
    if (nextValue >= item.contents.length) {
      setIsResultLoading(true);
    } else {
      setCurrent(nextValue);
    }
    // }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    localStorage.setItem("f5game-test-content-type", item.type);
  }, []);

  return (
    <>
      <HeadComponent
        item={item}
        canonicalUrl={`https://mindpang.com/play/${item.link}`}
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
              {offsets.map((offset, _index) => (
                <div
                  className="test-item mb-4"
                  key={Number(current) + Number(offset)}
                >
                  {item.contents[Number(current) + Number(offset)] &&
                  item.contents[Number(current) + Number(offset)].title.text ? (
                    <div className="test-play-title">
                      {Number(current) + Number(offset) + 1}.{" "}
                      {
                        item.contents[Number(current) + Number(offset)].title
                          .text
                      }
                    </div>
                  ) : (
                    ""
                  )}
                  {item.contents[Number(current) + Number(offset)] &&
                  item.contents[Number(current) + Number(offset)].title.url ? (
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
                  {item.contents[Number(current) + Number(offset)] ? (
                    <Radio.Group
                      className="mt-2"
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
                            <React.Fragment
                              key={`${
                                Number(current) + Number(offset)
                              }-${_index}`}
                            >
                              {question.text ? (
                                <Radio
                                  className="test-play-radio"
                                  value={_index}
                                >
                                  {question.text}
                                </Radio>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  ) : (
                    ""
                  )}

                  {Number(current) + Number(offset) <= contentLength ? (
                    <>
                      {(Number(current) + Number(offset)) % 4 === 3 ||
                      Number(current) + Number(offset) === contentLength ? (
                        <div className="my-3">
                          {/* <div className="mt-2">
                            <AdsensePlay slotId={item.adsenses.play} />
                          </div> */}
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
                    </>
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
