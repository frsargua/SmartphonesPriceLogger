import { Grid, Typography } from "@mui/material";
import { NewsCard } from "../../components/NewsCard";
import { useParams } from "react-router-dom";
import { TopicParams } from "../../types/index";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { fetchData } from "../../utils";
import { newsApi } from "../../utils/URIs";

type ArticleType = {
  topic?: string;
  author?: string;
  publishedAt?: Date;
  source?: { Id: string; Name: string };
  title?: string;
  url?: string;
};

export function News() {
  const { topic } = useParams<keyof TopicParams>() as TopicParams;
  const [news, setNews] = React.useState<ArticleType[]>([]);

  async function fetchNews(newsTopic: string) {
    var options = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/search",
      params: {
        q: `${topic}`,
        lang: "en",
        sort_by: "relevancy",
        page: "1",
        page_size: "10",
      },
      headers: {
        "x-api-key": "EUr2PGWNd4xfAfwdH1x_K3rIb8aFog_9HhOu2aClLFs",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.articles);
        setNews(response.data.articles);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchNews(topic);

    return;
  }, []);

  return (
    <>
      <Typography variant="h1" gutterBottom textAlign="center">
        News of {topic}
      </Typography>
      <Grid container spacing={3}>
        {news.map((article, i) => (
          <NewsCard key={i} data={article} />
        ))}
      </Grid>
    </>
  );
}
