import React from "react";
import { Divider, List } from "antd";
import { convertCategory } from "./constants";

export const Sidebar = ({ recentlyItems, popularItems }) => {
  return (
    <div className="mt-4 px-2">
      <Divider orientation="left">최신 테스트</Divider>
      <List
        bordered
        dataSource={recentlyItems}
        renderItem={(item) => (
          <List.Item>
            <a href={`/${item.category}/${item.link}`} target="_self">
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
            <a href={`/${item.category}/${item.link}`} target="_self">
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
