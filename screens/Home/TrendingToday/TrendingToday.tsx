import React from "react";
import { useTheme } from "@emotion/react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { useTrendingTodayService } from "./TrendingToday.service";
import {
  TrendingTodayContainerView,
  TrendingTodayImage,
  TrendingTodayInfoBackground,
  TrendingTodayTag,
  TrendingTodayTagText,
  TrendingTodayMangaName,
} from "./TrendingToday.styles";

export default function TrendingToday() {
  const theme = useTheme();
  const { handleSelectManga, loading, trendingTodayManga } =
    useTrendingTodayService();

  if (!loading && !trendingTodayManga) {
    return <></>;
  }

  return (
    <TrendingTodayContainerView onPress={handleSelectManga}>
      <Skeleton width={"100%"} height={"100%"} show={loading} radius={0}>
        <TrendingTodayImage
          source={{
            uri: trendingTodayManga?.image ?? "",
          }}
        />
      </Skeleton>

      <TrendingTodayInfoBackground
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.9)"]}
      >
        <TrendingTodayTag>
          <Icon
            name="star"
            size={+theme.layout.icon.small}
            color={theme.colors.accent}
          />
          <TrendingTodayTagText>TRENDING TODAY</TrendingTodayTagText>
        </TrendingTodayTag>

        <TrendingTodayMangaName>
          {trendingTodayManga?.title ?? (
            <Skeleton show width={200} height={40} />
          )}
        </TrendingTodayMangaName>
      </TrendingTodayInfoBackground>
    </TrendingTodayContainerView>
  );
}
