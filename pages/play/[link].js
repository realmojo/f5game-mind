import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Layout, Radio, Space } from "antd";
import { HeadComponent } from "../../components/Head";
import { AdsensePlay } from "../../components/Adsense/AdsensePlay";
import { ResultLoading } from "../../components/ResultLoading";

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

  const doNext = () => {
    // if (index < contentLength && testAnswer[index] === undefined) {
    //   alert("문항을 선택해 주세요");
    //   return;
    // }

    // const nextValue = index + 1;
    // if (nextValue >= item.contents.length) {
    setIsResultLoading(true);
    // } else {
    //   setCurrent(nextValue);
    // }
    // window.scrollTo(0, 0);
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
      <main className={`test-main ${isResultLoading ? "loading" : ""}`}>
        <Layout className="test-layout">
          {isResultLoading ? (
            <ResultLoading
              item={item}
              testAnswer={testAnswer}
              slotId={item.adsenses.loading}
            />
          ) : (
            <div>
              {item.contents.map((content, index) => (
                <div className="test-item mb-4" key={index}>
                  {content && content.title.text ? (
                    <h1 className="test-play-title">
                      {index + 1}. {content.title.text}
                    </h1>
                  ) : (
                    ""
                  )}
                  {content && content.title.url ? (
                    <div>
                      <img
                        className="test-play-img"
                        src={content.title.url}
                        alt={content.title.text}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {content ? (
                    <Radio.Group
                      className="mt-2"
                      onChange={(e) =>
                        onChangeTestAnswer(index, e.target.value)
                      }
                      value={testAnswer[index]}
                    >
                      <Space size={0} direction="vertical">
                        {item.contents[index].questions.map(
                          (question, _index) => {
                            return (
                              <React.Fragment key={`${index}-${_index}`}>
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
                          }
                        )}
                      </Space>
                    </Radio.Group>
                  ) : (
                    ""
                  )}
                </div>
              ))}
              <div className="my-3">
                <div className="text-center mt-4">
                  <Button
                    type="primary"
                    className="btn-start"
                    onClick={() => doNext()}
                  >
                    결과보기
                  </Button>
                </div>
              </div>
              {/* {offsets.map((offset, _index) => (
                <div
                  className="test-item mb-4"
                  key={index}
                >
                  {content &&
                  content.title.text ? (
                    <div className="test-play-title">
                      {index + 1}.{" "}
                      {
                        content.title
                          .text
                      }
                    </div>
                  ) : (
                    ""
                  )}
                  {content &&
                  content.title.url ? (
                    <div>
                      <img
                        className="test-play-img"
                        src={
                          content.title
                            .url
                        }
                        alt={
                          content.title
                            .text
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {content ? (
                    <Radio.Group
                      className="mt-2"
                      onChange={(e) =>
                        onChangeTestAnswer(
                          index,
                          e.target.value
                        )
                      }
                      value={testAnswer[index]}
                    >
                      <Space size={0} direction="vertical">
                        {item.contents[
                          index
                        ].questions.map((question, _index) => {
                          return (
                            <React.Fragment
                              key={`${
                                index
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

                  {index <= contentLength ? (
                    <>
                      {(index) % 4 === 3 ||
                      index === contentLength ? (
                        <div className="my-3">
                          <div className="text-center mt-4">
                            <Button
                              type="primary"
                              className="btn-start"
                              onClick={() =>
                                doNext(index)
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
              ))} */}
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
