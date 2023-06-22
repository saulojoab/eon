import responsive from '@/global/utils/responsive';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSelectedManga } from '@/redux/features/mangaSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { setCurrentlyReading } from '@/redux/features/mangaSlice';
import { ActivityIndicator } from 'react-native';
import CURRENTLY_READING_REQUESTS from '@/services/requests/currently-reading';

interface CurrentlyReadingMangaProps {
  id: string;
  currentChapter: string;
  finishedChapters: string[];
  image: string;
  source: string;
  referer: string;
}

export default function ContinueReadingContainer() {
  const { currentlyReading } = useAppSelector(state => state.manga);
  const user = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getCurrentlyReading() {
    setLoading(true);

    const response = await CURRENTLY_READING_REQUESTS.getCurrentlyReading(
      user._id,
    );

    dispatch(setCurrentlyReading(response));
    setLoading(false);
  }

  useEffect(() => {
    getCurrentlyReading();
  }, []);

  function handleContinueReading(manga: CurrentlyReadingMangaProps) {
    dispatch(
      setSelectedManga({
        id: manga.id,
        image: manga.image,
        referer: manga.referer,
      }),
    );
    navigation.navigate('MangaDetails');
  }

  function handleRemoveFromReading() {
    console.log('remove');
  }

  function getRandomText() {
    const texts = [
      'Within the vast expanse of existence, your current state reveals an absence of textual engagement, beckoning introspection into the profound implications of unread words and their impact on the essence of being.',
      'You are not reading anything.',
      'The absence of reading in your present moment raises questions about the impact of unread words.',
      'You are not reading anything. What does this mean?',
      'As you abstain from reading, reflect upon the uncharted territories of unopened mangas and the mysteries they may unlock within your existence.',
      'In the depths of a digital realm, where countless tales of wonder await, they lingered in the margins of unfamiliar narratives. Unseen and unengaged, the vibrant hues of illustrated stories eluded their existence, leaving an ache for unexplored realms and uncharted emotions that lay dormant within the virtual pages.',
      'Time slipped through their fingers like grains of sand as they gazed longingly at the unopened app on their screen. The untapped reservoir of emotions and escapism that awaited within the realm of manga remained untouched, leaving them adrift in a sea of unfulfilled curiosity and yearning for a connection they had yet to embrace.',
      "The digital library beckoned with its promises of boundless adventures, yet they remained on the precipice, paralyzed by the weight of indecision. In the absence of manga's embrace, an existential void expanded, leaving them adrift amidst the vast expanse of untold stories, yearning for the solace that only the inked pages could provide.",
      'ur not reading anything rn lmao',
    ];

    return texts[Math.floor(Math.random() * texts.length)];
  }

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingContainer>
    );
  }

  console.log(currentlyReading);

  if (currentlyReading.length === 0) {
    return <NotReadingAnythingText>{getRandomText()}</NotReadingAnythingText>;
  }

  return (
    <>
      <MangaList
        data={currentlyReading}
        renderItem={({ item: manga }: any) => (
          <MangaPressable
            onLongPress={() => handleRemoveFromReading()}
            onPress={() => handleContinueReading(manga)}
          >
            <MangaImage source={{ uri: manga.image || '' }} />
          </MangaPressable>
        )}
        horizontal
      />
    </>
  );
}

const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;

const NotReadingAnythingText = styled.Text`
  font-size: ${responsive(15)}px;
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(20)}px;
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(20)}px;
  text-align: justify;
`;

const MangaPressable = styled.TouchableOpacity``;

const MangaList = styled.FlatList``;

const LoadingContainer = styled.View`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  align-items: center;
  justify-content: center;
`;
