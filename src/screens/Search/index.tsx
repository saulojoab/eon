import React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import api from '@/services/api'
import styled, { useTheme } from 'styled-components/native'
import responsive from '@/global/utils/responsive'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/core'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'

interface MangaResult {
  id: string
  title: string
  altTitles: string[]
  headerForImage: { Referer: string }
  image: string
}

export default function Search(): JSX.Element {
  const [mangaData, setMangaData] = React.useState<MangaResult[]>([])
  const [search, setSearch] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const theme = useTheme()

  async function getMangaData(): Promise<void> {
    setLoading(true)
    const response = await api.get(`/manga/mangapill/${search}`)
    setLoading(false)
    console.log(response.data.results)
    setMangaData(response.data.results)
  }

  const handleSearch = _.debounce(() => {
    getMangaData()
  }, 500)

  const handleInputChange = (text: string): void => {
    setSearch(text)
    if (text === '') {
      setMangaData([])
      setLoading(false)
      return
    }

    handleSearch()
  }

  function handleSelectManga(manga: MangaResult): void {
    navigation.navigate('MangaDetails', { id: manga.id })
  }

  return (
    <Container>
      <MangaSearchInput
        onChangeText={handleInputChange}
        placeholder="Ex: Oyasumi Punpun"
        autoCapitalize="none"
        placeholderTextColor={theme?.colors.gray}
      />
      {search === '' && (
        <SearchGuideText>Search for any manga above!</SearchGuideText>
      )}
      {loading && <ActivityIndicator />}
      <ScrollView>
        <MangaList>
          {search !== '' &&
            mangaData?.map((manga, idx) => (
              <MangaItem
                onPress={() => {
                  handleSelectManga(manga)
                }}
                key={idx.toString()}
              >
                <MangaImage
                  resizeMode="contain"
                  source={{ uri: manga.image }}
                />
                <MangaInfo>
                  <MangaInfoBackground>
                    <MangaTitle>{manga.title}</MangaTitle>
                  </MangaInfoBackground>
                </MangaInfo>
              </MangaItem>
            ))}
        </MangaList>
      </ScrollView>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: ${responsive(30)}px;
  padding-top: ${responsive(60)}px;
  background-color: ${props => props.theme.colors.secondary};
`

const MangaItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-bottom: ${responsive(20)}px;
  background-color: ${props => props.theme.colors.white};
  shadow-color: ${props => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
  border-radius: 5px;
`

const MangaList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`

const MangaImage = styled.Image`
  width: 100%;
  height: 100%;
`

const MangaTitle = styled.Text`
  font-size: ${responsive(14)}px;
  font-weight: bold;
  color: ${props => props.theme.colors.white};
`

const MangaInfoBackground = styled.View`
  width: 100%;
  height: ${responsive(50)}px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${responsive(10)}px;
`

const MangaInfo = styled.View`
  width: 100%;
  flex-direction: column;
  position: absolute;
  bottom: 0;
`

const SearchGuideText = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${responsive(20)}px;
  align-self: center;
`

const MangaSearchInput = styled.TextInput`
  width: 100%;
  height: ${responsive(50)}px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray};
  padding: ${responsive(10)}px;
  margin-bottom: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
`
