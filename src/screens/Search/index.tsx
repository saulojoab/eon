import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import api from "../../services/api";
import styled from "styled-components/native";
import _ from "lodash";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MangaResult {
  id: string;
  title: string;
  altTitles: string[];
  headerForImage: { Referer: string };
  image: string;
}

export default function Search() {
  const [mangaData, setMangaData] = React.useState<MangaResult[]>([]);
  const [search, setSearch] = React.useState("");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getMangaData() {
    const response = await api.get(`/manga/mangapill/${search}`);
    response.data.results.map((manga: MangaResult) => console.log(manga.image));
    setMangaData(response.data.results);
  }

  const handleSearch = _.debounce(() => {
    getMangaData();
  }, 500);

  const handleInputChange = (text: string) => {
    setSearch(text);
    handleSearch();
  };

  function handleSelectManga(manga: MangaResult) {
    navigation.navigate("MangaDetails", { id: manga.id });
  }

  return (
    <Container>
      <MangaSearchInput
        onChangeText={handleInputChange}
        placeholder="Search manga"
      />
      <ScrollView style={{ flex: 1 }}>
        {mangaData.map((manga, idx) => (
          <MangaItem
            onPress={() => handleSelectManga(manga)}
            key={idx.toString()}
          >
            <MangaImage source={{ uri: manga.image }} />
            <MangaTitle>{manga.title}</MangaTitle>
          </MangaItem>
        ))}
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: 60px;
`;

const MangaItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
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

const MangaSearchInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;
