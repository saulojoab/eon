import React, { useEffect } from 'react'
import { FlatList, StatusBar } from 'react-native'
import api from '@/services/api'
import styled, { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/core'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import responsive from '@/global/utils/responsive'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { FavoriteButton } from '@/components'

interface MangaData {
  id: string
  title: string
  altTitles: string[]
  authors: string[]
  headerForImage: { Referer: string }
  image: string
  status: string
  genres: string[]
  description: string
  chapters: Array<{
    id: string
    chapter: string
    title: string
  }>
}

export default function MangaDetails({ route }: { route: any }) {
  const { id, image } = route.params

  const [mangaData, setMangaData] = React.useState<MangaData>()
  const [showFullDescription, setShowFullDescription] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const theme = useTheme()

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  async function getMangaData() {
    try {
      const response = await api.get(`/manga/mangapill/info?id=${id}`)
      if (!response.data) return
      setMangaData({
        ...response.data,
        chapters: response.data.chapters.reverse(),
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMangaData()
  }, [])

  function handleSelectChapter(chapter: any) {
    navigation.navigate('MangaReader', {
      id: chapter.id,
      chapter: chapter.chapter,
      mangaName: mangaData?.title,
    })
  }

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon size={30} color={theme.colors.white} name="arrow-left" />
        </BackButton>
        <MangaTitle>{mangaData?.title}</MangaTitle>
        <Favorite isFavorite={isFavorite} onPress={toggleFavorite} />
      </TitleAndBackButtonSection>

      <MangaImage source={{ uri: image }} />

      <DataSection>
        <SectionTitle>Description (press to expand)</SectionTitle>

        <MangaDescription
          onPress={toggleShowFullDescription}
          numberOfLines={showFullDescription ? undefined : 4}
        >
          {mangaData?.description}
        </MangaDescription>

        <SectionTitle>Chapters</SectionTitle>
      </DataSection>
      <FlatList
        data={mangaData?.chapters}
        renderItem={({ item }) => (
          <ChapterItem
            onPress={() => {
              handleSelectChapter(item)
            }}
          >
            <ChapterTitle>{item.chapter}</ChapterTitle>
          </ChapterItem>
        )}
        keyExtractor={item => item.id}
        numColumns={5}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`

const MangaDescription = styled.Text`
  font-size: ${responsive(14)}px;
  text-align: justify;
  margin-top: ${responsive(10)}px;
  color: ${props => props.theme.colors.white};
`

const MangaImage = styled.Image`
  width: 100%;
  height: ${responsive(100)}px;
`

const MangaTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  margin-left: ${responsive(20)}px;
`

const ChapterItem = styled.TouchableOpacity`
  flex: 1;
  margin: ${responsive(4)}px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${responsive(5)}px;
  margin-bottom: ${responsive(10)}px;
  padding: ${responsive(10)}px;
  justify-content: center;
  align-items: center;
`

const ChapterTitle = styled.Text`
  font-size: ${responsive(14)}px;
  font-weight: bold;
`

const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  padding: ${responsive(20)}px;
  padding-top: ${responsive(60)}px;
`

const BackButton = styled.TouchableOpacity`
  width: ${responsive(30)}px;
  height: ${responsive(30)}px;
  border-radius: ${responsive(15)}px;
  justify-content: center;
  align-items: center;
`

const SectionTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  width: 100%;
  margin-top: ${responsive(20)}px;
`
const DataSection = styled.View`
  flex-direction: column;
  padding: ${responsive(20)}px;
  padding-top: 0px;
`

const Favorite = styled(FavoriteButton)`
  position: absolute;
  right: ${responsive(15)}px;
  bottom: ${responsive(15)}px;
`
