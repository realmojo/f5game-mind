import React, { useState, useEffect } from "react";
import { Button, Input, Divider } from "antd";
const { TextArea } = Input;
import { TestCard } from "./TestCard";
import axios from "axios";
import AWS from "aws-sdk";
import shortId from "shortid";

const answerResultItem = {
  min: 0,
  max: 0,
  url: "",
  text: "",
};

const replaceAll = (str, searchStr, replaceStr) => {
  return str.split(searchStr).join(replaceStr);
};

export const Step3 = ({ next, prev, idx, testItem, S3_KEY }) => {
  const s3 = new AWS.S3({
    accessKeyId: S3_KEY.S3_ACCESS_KEY_ID,
    secretAccessKey: S3_KEY.S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
  });
  const [item, setItem] = useState({ title: "" });
  const [results, setResults] = useState([answerResultItem]);
  const addSetResult = async () => {
    setResults([
      ...results,
      {
        min: 0,
        max: 0,
        url: "",
        text: "",
      },
    ]);
  };
  const removeSetResult = async () => {
    results.pop();
    setResults([...results]);
  };
  const resultUpdate = async () => {
    try {
      const params = {
        testIdx: idx,
        results,
      };
      console.log(JSON.stringify(results));
      console.log(params);
      const data = await axios.post(
        "https://f5game.co.kr/api/test/update/result/",
        params
      );
      next();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilesResultImage = (e, _index) => {
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

        const d = results.map((item, key) => {
          if (key === _index) {
            return {
              ...item,
              url: data.Location,
            };
          } else {
            return item;
          }
        });
        setResults(d);
      });
    }
  };

  const onChangeText = (index, value) => {
    const d = results.map((item, key) => {
      if (key === index) {
        return {
          ...item,
          text: value,
        };
      } else {
        return item;
      }
    });
    setResults(d);
  };

  const onChangeMinMax = (index, value, type) => {
    const d = results.map((item, key) => {
      if (key === index) {
        if (type === "min") {
          return {
            ...item,
            min: Number(value),
          };
        } else if (type === "max") {
          return {
            ...item,
            max: Number(value),
          };
        }
      } else {
        return item;
      }
    });
    setResults(d);
  };

  useEffect(() => {
    if (testItem.idx) {
      (async () => {
        const { data } = await axios.get(
          `https://f5game.co.kr/api/test/contents/?testIdx=${idx}`
        );
        if (data.results) {
          setResults(data.results);
        }
      })();
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="text-center">
        {item.title ? <TestCard item={item} /> : ""}
      </div>

      {results &&
        results.length > 0 &&
        results.map((item, key) => (
          <div key={key} className="mb-4">
            <div className="test-subtitle mb-1">결과 {key + 1}</div>
            <div>
              <div className="text-sm font-bold mb-1">정답 맞춘 개수 범위</div>
              <Input.Group compact>
                <Input
                  type="number"
                  style={{
                    width: 100,
                    textAlign: "center",
                  }}
                  placeholder="Minimum"
                  value={item.min}
                  onChange={(e) => onChangeMinMax(key, e.target.value, "min")}
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: "none",
                  }}
                  placeholder="~"
                  disabled
                />
                <Input
                  type="number"
                  className="site-input-right"
                  style={{
                    width: 100,
                    textAlign: "center",
                  }}
                  placeholder="Maximum"
                  value={item.max}
                  onChange={(e) => onChangeMinMax(key, e.target.value, "max")}
                />
              </Input.Group>
              <div className="text-sm font-bold mt-4">결과 텍스트</div>
              <TextArea
                placeholder="결과를 글로 입력해주세요"
                className="mb-4"
                value={replaceAll(item.text, "<br />", "\n")}
                rows={7}
                onChange={(e) => onChangeText(key, e.target.value)}
              />
              <div className="text-sm font-bold mb-1">결과 이미지</div>
              {item.url ? (
                <img src={item.url} style={{ width: 400, height: 300 }} />
              ) : (
                ""
              )}
              <input
                type="file"
                name="file"
                onChange={(e) => handleFilesResultImage(e, key)}
                className="mb-4"
              />

              {/* <div className="text-sm font-bold mb-1">테스트 질문</div>

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
                </div>
              ))}
            </Radio.Group> */}
            </div>
            <Divider />
          </div>
        ))}

      <div className="mt-4">
        <Button status="danger" onClick={() => removeSetResult()}>
          문항 삭제
        </Button>
        <Button type="primary" className="ml-2" onClick={() => addSetResult()}>
          문항 추가
        </Button>
      </div>

      <div className="mt-8">
        <Button className="mr-2" onClick={() => prev()}>
          Previous
        </Button>
        <Button type="primary" onClick={() => resultUpdate()}>
          Next
        </Button>
      </div>
    </div>
  );
};
