import React from "react";
import { Button, Input } from "antd";
import axios from "axios";

export const Step1 = ({
  next,
  idx,
  setIdx,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const addTest = async () => {
    const params = {
      title,
      description,
    };
    if (!idx) {
      const { data } = await axios.post(
        "https://f5game.co.kr/api/test/add/",
        params
      );
      setIdx(data);
    } else {
      await axios.post("https://f5game.co.kr/api/test/update/", {
        ...params,
        idx,
      });
    }

    next();
  };

  return (
    <div className="mt-10">
      <div className="my-2">
        <div className="test-subtitle mb-1">테스트 제목</div>
        <Input
          size="large"
          placeholder="이름 혹은 별명을 적어주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-2">
        <div className="test-subtitle mb-1">테스트 설명</div>
        <Input
          size="large"
          placeholder="설명을 적어주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <Button type="primary" onClick={() => addTest()}>
          Next
        </Button>
      </div>
    </div>
  );
};
