import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

type ArticleType = {
  topic?: string;
  media?: string;
  published_date?: Date;
  title?: string;
  summary?: string;
  link?: string;
};

type PropsType = {
  data: ArticleType;
};

export function NewsCard({ data }: PropsType) {
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card
          sx={{
            width: "100%",
          }}
        >
          <a href={data.link} target="_blank">
            <CardMedia
              component="img"
              height="194"
              image={data.media}
              alt="Paella dish"
            />
          </a>
          <CardContent>
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                whiteSpace: "nowrap",
              }}
              gutterBottom
              fontWeight={700}
            >
              {data.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                whiteSpace: "nowrap",
              }}
            >
              {data.summary}
            </Typography>
            <Typography variant="body2">
              {data.published_date?.toString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
