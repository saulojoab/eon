export interface RecommendedMangaProps {
  __v: number;
  _id: string;
  createdAt: Date;
  image: string;
  manga_id: string;
  referer: string;
  title: string;
  todayViews: {
    _id: string;
    count: number;
    date: Date;
  };
  views: number;
}
