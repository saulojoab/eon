interface Source {
  name: string;
  value: string;
  language: string;
  url: string;
}

export const sources: Source[] = [
  {
    name: 'MangaHere',
    value: 'mangahere',
    language: 'en',
    url: 'https://www.mangahere.cc',
  },
  {
    name: 'MangaKakalot',
    value: 'mangakakalot',
    language: 'en',
    url: 'https://mangakakalot.com',
  },
  {
    name: 'MangaDex',
    value: 'mangadex',
    language: 'en',
    url: 'https://mangadex.org',
  },
  {
    name: 'MangaPark',
    value: 'mangapark',
    language: 'en',
    url: 'https://mangapark.net',
  },
  {
    name: 'MangaPill',
    value: 'mangapill',
    language: 'en',
    url: 'https://mangapill.com',
  },
  {
    name: 'MangaSee123',
    value: 'mangasee123',
    language: 'en',
    url: 'https://mangasee123.com',
  },
  {
    name: 'MangaHost',
    value: 'mangahost',
    language: 'pt-br',
    url: 'https://mangahosted.com',
  },
  {
    name: 'BRMangas',
    value: 'brmangas',
    language: 'pt-br',
    url: 'https://www.brmangas.net',
  },
];

function getSourceByURL(url: string) {
  console.log('getSourceByURL1', url);
  const source: Source | undefined = sources.find(src => src.url === url);

  console.log('getSourceByURL', source);

  return source?.value || '';
}

function getSourceLanguage(sourceValue: string) {
  const source: Source | undefined = sources.find(
    src => src.value === sourceValue,
  );

  return source?.language || '';
}

export default {
  sources,
  getSourceByURL,
  getSourceLanguage,
};
