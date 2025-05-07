export interface IMangaPreview {
  onPress: () => void;
  onLongPress?: () => void;
  image: string;
  provider?: string;
  title?: string;
}
