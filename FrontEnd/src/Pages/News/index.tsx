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
  const [news, setNews] = React.useState<ArticleType[]>([
    {
      title:
        "Apple is reportedly preparing to allow third-party app stores on iOS",
      author: "Igor Bonifacic",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-13T20:01:29Z",
      url: "https://www.engadget.com/apple-third-party-app-stores-report-195840839.html",
    },
    {
      title:
        "Apple has reportedly dropped out of NFL Sunday Ticket negotiations",
      author: "Igor Bonifacic",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-17T16:39:02Z",
      url: "https://www.engadget.com/apple-reportedly-drops-out-of-nfl-sunday-ticket-negotiations-163902095.html",
    },
    {
      title: "Apple Music Replay gets a much-needed redesign for 2022",
      author: "Kris Holt",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-11-29T15:21:15Z",
      url: "https://www.engadget.com/apple-music-replay-2022-redesign-152115957.html",
    },
    {
      title: "Elon Musk says Apple has ‘fully resumed’ advertising on Twitter",
      author: "Igor Bonifacic",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-04T18:20:40Z",
      url: "https://www.engadget.com/elon-musk-says-apple-has-fully-resumed-advertising-on-twitter-182040425.html",
    },
    {
      title: "Apple TV devices now recognize up to six different voices",
      author: "Jon Fingas",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-14T16:06:38Z",
      url: "https://www.engadget.com/apple-tv-voice-recognition-tvos-16-2-160638329.html",
    },
    {
      title:
        "The best Black Friday Apple deals on iPads, MacBooks, AirPods and more",
      author: "Amy Skorheim",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-11-25T12:30:50Z",
      url: "https://www.engadget.com/best-black-friday-apple-deals-on-ipads-macbooks-airpods-and-more-123050079.html",
    },
    {
      title:
        "The best iPads for 2022: how to pick the best Apple tablet for you",
      author: "Jeff Dunn",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-01T15:00:54Z",
      url: "https://www.engadget.com/best-ipads-how-to-pick-the-best-apple-tablet-for-you-150054066.html",
    },
    {
      title:
        "The Morning After: Apple may allow third-party app stores on iOS in the future",
      author: "Mat Smith",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-14T12:15:44Z",
      url: "https://www.engadget.com/the-morning-after-apple-may-allow-third-party-app-stores-on-i-os-in-the-future-121544101.html",
    },
    {
      title:
        "Google, Apple and Mozilla team up to build a better browser benchmark",
      author: "Will Shanklin",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-16T21:29:57Z",
      url: "https://www.engadget.com/speedometer-3-browser-benchmark-apple-google-mozilla-212957943.html",
    },
    {
      title:
        "Apple releases iOS 16.2 with always-on display changes and tighter security",
      author: "Jon Fingas",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-13T18:06:25Z",
      url: "https://www.engadget.com/apple-ios-16-2-available-180625523.html",
    },
    {
      title: "Apple’s 2022 App Store Awards put the focus on ‘cultural impact’",
      author: "Mariella Moon",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-11-29T09:44:22Z",
      url: "https://www.engadget.com/apple-2022-app-store-awards-094422535.html",
    },
    {
      title:
        "Apple's future iPhones and Macs will use TSMC chips made in Arizona",
      author: "Jon Fingas",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-06T21:45:44Z",
      url: "https://www.engadget.com/apple-to-use-tsmc-arizona-factory-chips-214544360.html",
    },
    {
      title:
        "iPhone AirDrop restriction first seen in China will roll out worldwide with iOS 16.2",
      author: "Will Shanklin",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-07T22:32:31Z",
      url: "https://www.engadget.com/apple-china-airdrop-limit-everyone-ios-16-2-223231192.html",
    },
    {
      title:
        "Elon Musk says he and Tim Cook 'resolved the misunderstanding' about Twitter's iOS app",
      author: "Karissa Bell",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-01T00:57:02Z",
      url: "https://www.engadget.com/elon-musk-says-he-and-tim-cook-resolved-the-misunderstanding-about-twitter-005702715.html",
    },
    {
      title: "Apple’s latest iPad drops to $399 at Amazon",
      author: "Igor Bonifacic",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-04T16:14:46Z",
      url: "https://www.engadget.com/apple-10th-generation-ipad-sale-amazon-161446402.html",
    },
    {
      title:
        "iPadOS 16.2 includes Freeform collaboration app and Stage Manager on an external display",
      author: "Nathan Ingraham",
      source: {
        Id: "engadget",
        Name: "Engadget",
      },
      publishedAt: "2022-12-13T18:07:21Z",
      url: "https://www.engadget.com/ipad-os-16-2-freeform-stage-manager-updates-180721608.html",
    },
  ]);

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

    // setNews(data.articles);
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
