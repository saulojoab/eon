import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import api from "../../services/api";
import styled from "styled-components/native";
import _ from "lodash";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MangaData {
  id: string;
  title: string;
  altTitles: string[];
  authors: string[];
  headerForImage: { Referer: string };
  image: string;
  status: string;
  genres: string[];
  description: string;
  chapters: {
    id: string;
    chapter: string;
    title: string;
  }[];
}

export default function MangaDetails({ route }: { route: any }) {
  const { id } = route.params;
  const [mangaData, setMangaData] = React.useState<MangaData>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getMangaData() {
    const response = await api.get(`/manga/mangapill/info?id=${id}`);
    console.log(response.data);
    setMangaData(response.data);
  }

  useEffect(() => {
    getMangaData();
  }, []);

  function handleSelectChapter(chapter: any) {
    navigation.navigate("MangaReader", { id: chapter.id });
  }

  return (
    <Container>
      <MangaTitle>
        {mangaData?.title} - {mangaData?.authors?.map((value) => value)}
      </MangaTitle>
      <MangaImage source={{ uri: mangaData?.image }} />
      <MangaDescription>{mangaData?.description}</MangaDescription>
      <ScrollView>
        <ChapterGridList>
          {mangaData?.chapters.reverse().map((chapter) => (
            <ChapterItem onPress={() => handleSelectChapter(chapter)}>
              <ChapterTitle>{chapter.chapter}</ChapterTitle>
            </ChapterItem>
          ))}
        </ChapterGridList>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: 60px;
`;

const MangaDescription = styled.Text`
  font-size: 16px;
  margin-top: 20px;
`;

const MangaImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const MangaTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

const ChapterGridList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

const ChapterItem = styled.TouchableOpacity`
  width: 80px;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const ChapterTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ChapterDate = styled.Text`
  font-size: 12px;
  color: #999;
`;
