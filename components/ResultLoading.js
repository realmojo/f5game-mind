import React, { useState, useEffect } from "react";
import { Spin, Button, message } from "antd";
import { useRouter } from "next/router";
import { AdsenseLoading } from "./Adsense/AdsenseLoading";
// import { LoadingShare } from "./LoadingShare";

const success = () => {
  message.success("URL이 복사되었습니다.");
};
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const ResultLoading = ({ item, testAnswer, slotId }) => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const doShare = (type) => {
    if (type === "twitter") {
    } else if (type === "kakao") {
      createKakaoButton();
    } else if (type === "facebook") {
      shareFacebook();
    } else if (type === "link") {
      copy();
    }
    setTimeout(() => {
      router.push(
        {
          pathname: `/result/${item.link}`,
          query: { jsonItem: JSON.stringify(item) },
        },
        `/result/${item.link}`
      );
    }, 1000);
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://mindpang.com/${
        item.category
      }/${encodeURIComponent(item.link)}&t=${item.title}`,
      "_blank",
      "width=600, height: 400"
    );
  };
  const copy = () => {
    success();
    var textarea = document.createElement("textarea");
    textarea.value = `https://mindpang.com/${item.category}/${item.link}`;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("4620ebc4c39b8b6bb94e0e471b33de8c");
      }
      // kakao.Link.createDefaultButton({
      kakao.Share.sendDefault({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        // container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: item.title,
          description: item.description,
          imageUrl: item.logo,
          link: {
            mobileWebUrl: `https://mindpang.com/${item.category}/${item.link}`,
            webUrl: `https://mindpang.com/${item.category}/${item.link}`,
          },
        },
        buttons: [
          {
            title: "플레이 하기",
            link: {
              mobileWebUrl: `https://mindpang.com/${item.category}/${item.link}`,
              webUrl: `https://mindpang.com/${item.category}/${item.link}`,
            },
          },
        ],
      });

      // setTimeout(() => {
      //   router.push(
      //     {
      //       pathname: `/result/${item.link}`,
      //       query: { jsonItem: JSON.stringify(item) },
      //     },
      //     `/result/${item.link}`
      //   );
      // }, 1000);
    }
  };

  useEffect(() => {
    if (testAnswer.length === 0) {
      alert("올바르지 않은 경로입니다.");
      location.href = item.link ? `/${item.category}/${item.link}` : "/";
    }
    let totalCount = 0;

    if (item.contents.length > 0) {
      for (const i in item.contents) {
        if (item.type === "answer") {
          if (item.contents[i].answer === testAnswer[i]) {
            totalCount++;
          }
        } else if (item.type === "score") {
          totalCount += item.contents[i].questions[testAnswer[i]].score;
        }
      }

      let results = null;
      if (item.type === "random") {
        const ran = getRandomNumber(0, item.results.length - 1);
        localStorage.setItem(
          "f5game-test-result",
          JSON.stringify({ ...item.results[ran], totalCount })
        );
      } else {
        for (const i in item.results) {
          if (
            item.results[i].min <= totalCount &&
            totalCount <= item.results[i].max
          ) {
            results = item.results[i];
            localStorage.setItem(
              "f5game-test-result",
              JSON.stringify({ ...results, totalCount })
            );
          }
        }
      }
    }

    const contentTotalCount = item.contents.length;
    const score = Math.ceil((totalCount * 100) / contentTotalCount);
    setTotal(score);
    setTimeout(() => {
      setIsLoading(false);
      // setTimeout(() => {
      //   createKakaoButton();
      // }, 100);
    }, 3000);
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-8 loading-title">
        {isLoading ? "결과를 기다리고 있습니다." : "결과를 확인해 주세요"}
      </h1>
      {isLoading ? (
        <div className="text-center pt-4 mb-2">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <AdsenseLoading slotId={slotId} />
      {isLoading ? (
        ""
      ) : (
        <div className="text-center flex flex-col justify-center px-4 mt-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${
              item.title
            }%0A----------------%0A테스트 결과 점수 ${total}점%0Ahttps://mindpang.com/${
              item.category
            }/${encodeURI(encodeURI(item.link))}%0A#테스트결과 #마인드팡`}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className="btn-twitter"
              size="large"
              onClick={() => doShare("twitter")}
            >
              트위터로 확인하기
            </Button>
          </a>
          <Button
            // id="kakao-link-btn"
            className="btn-kakao"
            size="large"
            onClick={() => doShare("kakao")}
          >
            카카오톡으로 확인하기
          </Button>
          <Button
            className="btn-facebook"
            size="large"
            onClick={() => doShare("facebook")}
          >
            페이스북으로 확인하기
          </Button>
          <Button
            className="btn-mindpang"
            size="large"
            onClick={() => doShare("link")}
          >
            링크공유 확인하기
          </Button>
        </div>
      )}
    </>
  );
};
