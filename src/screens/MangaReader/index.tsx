import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import api from '@/services/api'
import styled from 'styled-components/native'

interface Chapter {
  page: number
  img: string
}

export default function MangaReader({ route }: { route: any }) {
  const { id } = route.params
  const [mangaChapters, setMangaChapters] = React.useState<Chapter[]>()

  async function getMangaData() {
    const response = await api.get(`/manga/mangapill/read?chapterId=${id}`)
    console.log(response.data)
    setMangaChapters(response.data)
  }

  useEffect(() => {
    getMangaData()
  }, [])

  return (
    <Container>
      <PageImagesScrollView>
        {mangaChapters?.map(chapter => (
          <PageImage
            resizeMode="contain"
            source={{ uri: chapter.img }}
            key={chapter.page}
          />
        ))}
      </PageImagesScrollView>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #000;
`

const PageImage = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`

const PageImagesScrollView = styled.ScrollView`
  flex: 1;
`
