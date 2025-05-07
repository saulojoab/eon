import React from "react";
import { Skeleton } from "moti/skeleton";
import { useRecommendedService } from "./Recommended.service";
import { RecommendedList, NothingToRecommendText } from "./Recommended.styles";
import MangaPreview from "@/components/MangaPreview/MangaPreview";
import { MangaContainer } from "../Home.styles";

export default function Recommended() {
  const { handleSelectManga, shouldDisplay, loading, recommendedManga } =
    useRecommendedService();

  if (!shouldDisplay) {
    return (
      <>
        <NothingToRecommendText>
          As of now, there's nothing to recommend. Manga will appear here as
          other users start reading them. Be the first one!
        </NothingToRecommendText>
        <MangaPreview
          onPress={() => {}}
          image={
            "https://i.pinimg.com/1200x/bb/b1/7e/bbb17ec6fccf88c81834d06eb33f9a9e.jpg"
          }
        />
      </>
    );
  }

  return (
    <Skeleton show={loading} width={150} radius={0} height={220}>
      <RecommendedList
        data={recommendedManga}
        renderItem={({ item }: any) => (
          <MangaContainer>
            <MangaPreview
              onPress={() => handleSelectManga(item)}
              image={item.image}
            />
          </MangaContainer>
        )}
        horizontal
      />
    </Skeleton>
  );
}
