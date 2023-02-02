import React, { useState } from "react";
import { Button, Input } from "antd";
import Link from "next/link";
const { Search } = Input;

const menuItems = [
  {
    title: "전체",
    key: "all",
    link: "/",
  },
  {
    title: "라이프",
    key: "life",
    link: "/life",
  },
  {
    title: "사랑",
    key: "love",
    link: "/love",
  },
  {
    title: "건강",
    key: "health",
    link: "/health",
  },
  {
    title: "돈",
    key: "money",
    link: "/money",
  },
  {
    title: "연예",
    key: "entertain",
    link: "/entertain",
  },
];
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const Header = ({ NODE_ENV, items, category }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const doRandomStart = () => {
    const randomNumber = getRandomNumber(0, items.length - 1);
    location.href = `/main/${items[randomNumber].link}`;
  };
  const doSearch = () => {
    setIsSearch(!isSearch);
  };
  const doKeywordSearch = () => {
    location.href = `/?search=${searchText}`;
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
        <Button onClick={() => doSearch()}>검색</Button>
        {NODE_ENV === "development" ? (
          <span className="pt-2 pr-2">
            <Link href="/make">
              <Button type="primary" size="small">
                만들기
              </Button>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
      {isSearch ? (
        <div className="search-layout">
          <Search
            className="w-full"
            placeholder="찾고 싶은 테스트를 검색해주세요."
            onSearch={() => doKeywordSearch()}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => doKeywordSearch()}
          />
        </div>
      ) : (
        ""
      )}
      <ul className="mindpang-menu">
        {menuItems.map((menu) => (
          <li key={menu.key}>
            <a
              href={`/${menu.key !== "all" ? menu.key : ""}`}
              className={`menu-item ${
                category === menu.key ? "menu-item-active" : ""
              }`}
              target="_self"
              key={menu.key}
            >
              {menu.title}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};
