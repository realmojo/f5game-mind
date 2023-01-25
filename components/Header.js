import React from "react";
import { Button } from "antd";
import Link from "next/link";

export const Header = ({ NODE_ENV, items }) => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const doRandomStart = () => {
    const randomNumber = getRandomNumber(0, items.length - 1);
    location.href = `/main/${items[randomNumber].link}`;
  };
  return (
    <header>
      <div className="header-wrap">
        <Link href="/">마인드팡</Link>
        <img
          src="https://f5game.s3.ap-northeast-2.amazonaws.com/testpang-logo.png"
          style={{
            width: 30,
            height: 30,
            marginTop: "-8px",
            marginLeft: 4,
            display: "inline",
          }}
        />
        <Button onClick={() => doRandomStart()}>랜덤 테스트</Button>
        {NODE_ENV === "development" ? (
          <span className="pt-2 pr-2">
            <Link href="/make">
              <Button type="primary" size="large">
                만들기
              </Button>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
