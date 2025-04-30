import React from "react";
import responsive from "@/global/utils/responsive";
import { Skeleton } from "moti/skeleton";
import { useRecommendedService } from "./Recommended.service";
import {
  RecommendedList,
  MangaPressable,
  MangaImage,
  NothingToRecommendText,
} from "./Recommended.styles";

export default function Recommended() {
  const { handleSelectManga, shouldDisplay, loading, recommendedManga } =
    useRecommendedService();

  if (!shouldDisplay) {
    return (
      <MangaPressable onPress={() => {}}>
        <NothingToRecommendText>
          As of now, there's nothing to recommend. Manga will appear here as
          other users start reading them. Be the first one!
        </NothingToRecommendText>
        <MangaImage
          source={{
            uri: "https://i.pinimg.com/1200x/bb/b1/7e/bbb17ec6fccf88c81834d06eb33f9a9e.jpg",
          }}
        />
      </MangaPressable>
    );
  }

  return (
    <Skeleton
      show={loading}
      width={responsive(150)}
      radius={0}
      height={responsive(220)}
    >
      <RecommendedList
        data={recommendedManga}
        renderItem={({ item }: any) => (
          <MangaPressable onPress={() => handleSelectManga(item)}>
            <MangaImage
              source={{
                uri: item.image,
              }}
            />
          </MangaPressable>
        )}
        horizontal
      />
    </Skeleton>
  );
}
