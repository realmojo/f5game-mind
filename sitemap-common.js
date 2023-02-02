const axios = require("axios");
const fs = require("fs");
const prettier = require("prettier");

// 오늘 날짜 가져오기 & 도메인 설정
const DOMAIN = "https://mindpang.com";
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

const replaceAll = (str, searchStr, replaceStr) => {
  return str.split(searchStr).join(replaceStr);
};

(async () => {
  const { data } = await axios.get(
    "https://f5game.co.kr/api/test/getTests.php"
  );
  const pagesSitemap = `${data.map((item) => {
    return `<url>
            <loc>${DOMAIN}/main/${encodeURI(item.link)}</loc>
            <lastmod>${item.regdate.substring(0, 10)}</lastmod>
          </url>
          <url>
            <loc>${DOMAIN}/play/${encodeURI(item.link)}</loc>
            <lastmod>${item.regdate.substring(0, 10)}</lastmod>
          </url>
          `;
  })}`;

  // 파일 경로를 도메인 형태로 변경
  // const pagesSitemap = `
  //   ${pages
  //     .map((page) => {
  //       const path = page
  //         .replace("../pages/", "")
  //         .replace(".js", "")
  //         .replace(/\/index/g, "");
  //       const routePath = path === "index" ? "" : path;
  //       return `
  //         <url>
  //           <loc>${DOMAIN}/${routePath}</loc>
  //           <lastmod>${getDate}</lastmod>
  //         </url>
  //       `;
  //     })
  //     .join("")}`;

  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
        <loc>${DOMAIN}</loc>
        <lastmod>2023-01-01</lastmod>
        <changefreq>always</changefreq>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${DOMAIN}/life</loc>
        <lastmod>2023-01-01</lastmod>
        <changefreq>always</changefreq>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${DOMAIN}/love</loc>
        <lastmod>2023-01-01</lastmod>
        <changefreq>always</changefreq>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${DOMAIN}/health</loc>
        <lastmod>2023-01-01</lastmod>
        <changefreq>always</changefreq>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${DOMAIN}/money</loc>
        <lastmod>2023-01-01</lastmod>
        <changefreq>always</changefreq>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${DOMAIN}/entertain</loc>
        <lastmod>2023-01-01</lastmod>
        <changefreq>always</changefreq>
        <priority>1.00</priority>
      </url>
      ${replaceAll(pagesSitemap, ",", "")}
    </urlset>`;

  const formattedSitemap = [formatted(generatedSitemap)];
  fs.writeFileSync("./public/sitemap.xml", formattedSitemap[0], "utf8");
})();
