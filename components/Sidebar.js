import React from "react";
import { Divider, List } from "antd";

const convertCategory = (value) => {
  let convertString = value;
  if (value.includes("life")) {
    convertString = convertString.replace("life", "라이프");
  }
  if (value.includes("love")) {
    convertString = convertString.replace("love", "사랑");
  }
  if (value.includes("health")) {
    convertString = convertString.replace("health", "건강");
  }
  if (value.includes("entertain")) {
    convertString = convertString.replace("entertain", "연예");
  }
  if (value.includes("money")) {
    convertString = convertString.replace("money", "돈");
  }
  return convertString;
};

export const Sidebar = ({ recentlyItems, popularItems }) => {
  return (
    <div className="mt-4 px-2">
      <Divider orientation="left">최신 테스트</Divider>
      <List
        bordered
        dataSource={recentlyItems}
        renderItem={(item) => (
          <List.Item>
            <a href={`/main/${item.link}`} target="_self">
              <span className="category-sidebar-text">
                [{convertCategory(item.category)}]
              </span>{" "}
              <span className="category-sidebar-title">{item.title}</span>
            </a>
          </List.Item>
        )}
      />
      <div className="mt-8"></div>
      <Divider orientation="left">가장 인기있는 테스트</Divider>
      <List
        bordered
        dataSource={popularItems}
        renderItem={(item) => (
          <List.Item>
            <a href={`/main/${item.link}`} target="_self">
              <span className="category-sidebar-text">
                [{convertCategory(item.category)}]
              </span>{" "}
              <span className="category-sidebar-title">{item.title}</span>
            </a>
          </List.Item>
        )}
      />
    </div>
  );
};
