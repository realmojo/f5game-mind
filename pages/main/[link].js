import { useEffect } from "react";
import axios from "axios";
export default function Main({ item }) {
  useEffect(() => {
    location.href = `/${item.category}/${item.link}`;
  }, []);
}

export const getStaticPaths = async () => {
  const { data } = await axios.get(
    `${process.env.BASE_API_URL}/test/getTests.php`
  );
  const paths = [];
  for (const item of data) {
    paths.push({
      params: {
        link: item.link,
      },
    });
  }
  return {
    paths,
    fallback: true,
  };
};

// export const getServerSideProps = async ({ req, params }) => {
export const getStaticProps = async ({ req, params }) => {
  const { link } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/getTestByLink.php?link=${link}`
  );

  return {
    props: {
      item: res.data,
      NODE_ENV: process.env.NODE_ENV,
    },
  };
};
