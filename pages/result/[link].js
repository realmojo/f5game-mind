import React, { useState, useEffect } from "react";
import { Divider, Layout } from "antd";
import { HeadComponent } from "../../components/Head";
import { AdsenseComplete } from "../../components/Adsense/AdsenseComplete";
import { useRouter } from "next/router";
import { Share } from "../../components/Share";
import { TestList } from "../../components/TestList";

export default function Result() {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [resultItem, setResultItem] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [contentTotalCount, setContentTotalCount] = useState(0);
  const [name, setName] = useState("");
  useEffect(() => {
    const { jsonItem } = router.query;
    const item = jsonItem !== undefined ? JSON.parse(jsonItem) : "";
    const link = location.pathname.split("/result/")[1];
    const localName = localStorage.getItem("f5game-test-name");
    if (jsonItem === undefined) {
      alert("올바르지 않은 경로입니다.");
      location.href = `/main/${link}`;
    } else {
      if (item.type === "random") {
        const result = localStorage.getItem("f5game-test-result")
          ? JSON.parse(localStorage.getItem("f5game-test-result"))
          : "";
        setItem(item);
        setResultItem(result);
      } else {
        const result = localStorage.getItem("f5game-test-result")
          ? JSON.parse(localStorage.getItem("f5game-test-result"))
          : "";

        const totalCount = result.totalCount ? result.totalCount : 0;
        if (result === "") {
          location.href = `/main/${link}`;
        }
        setItem(item);
        setResultItem(result);

        const contentTotalCount = item.contents.length;
        setTotalCount(totalCount);
        setContentTotalCount(contentTotalCount);
        const score = Math.ceil((totalCount * 100) / contentTotalCount);
        setTotal(score);
        setName(localName);
      }
    }
  }, []);

  return (
    <>
      {item ? (
        <HeadComponent
          item={item}
          canonicalUrl={`https://mindpang.com/result/${item.link}`}
        />
      ) : (
        ""
      )}
      <main className="test-main">
        <Layout className="test-layout">
          {resultItem ? (
            <React.Fragment>
              <h1 className="px-2 pt-4 pb-4 text-2xl font-bold text-center">
                {name}님 결과분석
              </h1>
              {resultItem.url ? (
                <img
                  className="test-play-img"
                  src={resultItem.url}
                  alt="logo"
                />
              ) : (
                ""
              )}
              {item.type === "answer" ? (
                <>
                  <div className="px-2 pt-4 text-2xl">
                    테스트 점수{" "}
                    <span className="text-blue-600 font-bold mr-2">
                      {total} 점
                    </span>
                    (
                    {item.type === "answer"
                      ? `${totalCount} / ${contentTotalCount}`
                      : ""}
                    )
                  </div>
                  <Divider />
                </>
              ) : (
                ""
              )}

              <div className="test-result-text">
                {resultItem.text.split("<br />").map((line, key) => {
                  return (
                    <React.Fragment key={key}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                })}
              </div>
              <Share
                item={item}
                total={total}
                totalCount={totalCount}
                contentTotalCount={contentTotalCount}
              />

              <h2 className="px-2 text-xl font-bold">
                👉 다른 테스트 하러가기
              </h2>
              <AdsenseComplete slotId={item.adsenses.result} />
              <TestList />
            </React.Fragment>
          ) : (
            "결과 가져오는 중..."
          )}
        </Layout>
      </main>
    </>
  );
}
