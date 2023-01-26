import React, { useState, useEffect } from "react";
import { Input, Button, Divider, Radio, InputNumber } from "antd";
import AWS from "aws-sdk";
import shortId from "shortid";
import axios from "axios";

const defaultContent = {
  title: {
    text: "",
    url: "",
  },
  answer: 0,
  questions: [
    {
      key: 0,
      score: 1,
      type: "text", // image
      text: "전혀 아니다.",
      url: "",
    },
    {
      key: 1,
      score: 2,
      type: "text", // image
      text: "아니다.",
      url: "",
    },
    {
      key: 2,
      score: 3,
      type: "text", // image
      text: "약간 그렇다.",
      url: "",
    },
    {
      key: 3,
      score: 4,
      type: "text", // image
      text: "매우 그렇다.",
      url: "",
    },
  ],
};

export const Step2 = ({ next, prev, idx, testItem, S3_KEY }) => {
  const [contentType, setContentType] = useState("answer");
  // const [questionTextCount, setQuestionTextCount] = useState(4);
  // const [questionTextCountArr, setQuestionTextCountArr] = useState([
  //   0, 1, 2, 3,
  // ]);
  const [contents, setContents] = useState([defaultContent]);
  const [logo, setLogo] = useState("");

  const testUpdate = async () => {
    const params = {
      testIdx: idx,
      type: contentType,
      contents,
    };
    if (idx) {
      await axios.post("https://f5game.co.kr/api/test/update/content/", params);
    }
    next();
  };

  const onChangeTitleContent = (index, value) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        return {
          ...item,
          title: {
            url: item.title.url,
            text: value,
          },
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const handleFilesTitleContent = (e, _index) => {
    const files = Array.from(e.target.files);

    for (let index = 0; index < files.length; index++) {
      const ext = files[index].type.split("/")[1];
      const params = {
        Bucket: "f5game-test-image",
        Key: `images/${idx}/${shortId.generate()}.${ext}`,
        Body: files[index],
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
        }
        // const param = {
        //   idx,
        //   logo: data.Location,
        // };

        // await axios.post("https://f5game.co.kr/api/test/update/logo/", param);

        const d = contents.map((item, key) => {
          if (key === _index) {
            return {
              ...item,
              title: {
                text: item.title.text,
                url: data.Location,
              },
            };
          } else {
            return item;
          }
        });
        setContents(d);
      });
    }
  };

  const onChangeQuestionContent = (index, _index, value) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        const q = item.questions;
        q[_index].text = value;
        return {
          ...item,
          questions: q,
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const onChangeAnswerContent = (index, _index) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        return {
          ...item,
          answer: _index,
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const onChangeScoreContent = (index, _index, value) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        const q = item.questions;
        q[_index].score = Number(value);
        return {
          ...item,
          questions: q,
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const onChangeAnswer = (index, key, value) => {};

  const addSetQuestionArr = () => {
    setContents([
      ...contents,
      {
        title: {
          text: "",
          url: "",
        },
        answer: 0,
        questions: [
          {
            key: 0,
            score: 1,
            type: "text", // image
            text: "전혀 아니다.",
            url: "",
          },
          {
            key: 1,
            score: 2,
            type: "text", // image
            text: "아니다.",
            url: "",
          },
          {
            key: 2,
            score: 3,
            type: "text", // image
            text: "약간 그렇다.",
            url: "",
          },
          {
            key: 3,
            score: 4,
            type: "text", // image
            text: "매우 그렇다.",
            url: "",
          },
        ],
      },
    ]);
  };
  const removeSetQuestionArr = () => {
    contents.pop();
    setContents([...contents]);
  };

  const onChangeType = (e) => {
    setContentType(e.target.value);
  };
  const s3 = new AWS.S3({
    accessKeyId: S3_KEY.S3_ACCESS_KEY_ID,
    secretAccessKey: S3_KEY.S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
  });

  const handleFilesChange = async ({ target }) => {
    const files = Array.from(target.files);

    for (let index = 0; index < files.length; index++) {
      const ext = files[index].type.split("/")[1];
      const params = {
        Bucket: "f5game-test-image",
        Key: `images/${idx}/${shortId.generate()}.${ext}`,
        Body: files[index],
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
        }
        const param = {
          idx,
          logo: data.Location,
        };

        await axios.post("https://f5game.co.kr/api/test/update/logo/", param);
        setLogo(data.Location);
      });
    }
  };

  useEffect(() => {
    if (testItem.idx) {
      (async () => {
        const { data } = await axios.get(
          `https://f5game.co.kr/api/test/contents/?testIdx=${idx}`
        );
        setContents(data.contents ? data.contents : [defaultContent]);
        setLogo(testItem.logo);
        setContentType(data.type);
      })();
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="mt-4">
        <div className="test-subtitle mb-1">메인 이미지</div>
        <div>
          {logo ? (
            <img src={logo} alt="logo" style={{ width: 400, height: 300 }} />
          ) : (
            ""
          )}
          <input
            type="file"
            name="file"
            onChange={handleFilesChange}
            className="mb-4"
          />
          <div className="test-subtitle mb-1">테스트 타입</div>
          <Radio.Group
            className="mb-4"
            onChange={onChangeType}
            value={contentType}
          >
            <Radio value="answer">정답형</Radio>
            <Radio value="score">점수형</Radio>
            <Radio value="random">랜덤형</Radio>
          </Radio.Group>
          {/* <div className="test-subtitle mb-1">테스트 문항 개수</div>
          <InputNumber
            min={1}
            max={4}
            defaultValue={questionTextCount}
            onChange={onChangeQuestionTextCount}
          /> */}
          <Divider />

          <div className="mt-4">
            <Button status="danger" onClick={() => removeSetQuestionArr()}>
              문항 삭제
            </Button>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => addSetQuestionArr()}
            >
              문항 추가
            </Button>
          </div>
          {contents !== null &&
            contents.map((item, key) => (
              <div key={key} className="mb-4">
                <div className="test-subtitle mb-1">테스트 문항 {key + 1}</div>
                <div>
                  <div className="text-sm font-bold mb-1">
                    테스트 제목 텍스트
                  </div>
                  <Input
                    size="large"
                    placeholder="제목을 적어주세요"
                    className="mb-4"
                    value={item.title.text}
                    onChange={(e) => onChangeTitleContent(key, e.target.value)}
                  />
                  <div className="text-sm font-bold mb-1">
                    테스트 제목 이미지
                  </div>
                  {item.title.url ? (
                    <img
                      src={item.title.url}
                      style={{ width: 400, height: 300 }}
                    />
                  ) : (
                    ""
                  )}
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleFilesTitleContent(e, key)}
                    className="mb-4"
                  />

                  <div className="text-sm font-bold mb-1">테스트 질문</div>

                  <Radio.Group onChange={onChangeAnswer} value={item.answer}>
                    {item.questions.map((_item, _key) => (
                      <div className="flex" key={_key}>
                        <Radio
                          value={_key}
                          onChange={(e) => onChangeAnswerContent(key, _key)}
                          style={{ marginTop: -14 }}
                        />
                        <Input
                          size="large"
                          placeholder="질문을 적어주세요"
                          className="mb-4"
                          value={_item.text}
                          onChange={(e) =>
                            onChangeQuestionContent(key, _key, e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          min={1}
                          max={4}
                          defaultValue={0}
                          value={_item.score}
                          onChange={(e) =>
                            onChangeScoreContent(key, _key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <Divider />
              </div>
            ))}
          <div className="mt-4">
            <Button status="danger" onClick={() => removeSetQuestionArr()}>
              문항 삭제
            </Button>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => addSetQuestionArr()}
            >
              문항 추가
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button className="mr-2" onClick={() => prev()}>
          Previous
        </Button>
        <Button type="primary" onClick={() => testUpdate()}>
          Next
        </Button>
      </div>
    </div>
  );
};
