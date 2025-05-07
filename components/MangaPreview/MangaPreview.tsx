import { Container, Image, ProviderText, Title } from "./MangaPreview.style";
import { IMangaPreview } from "./MangaPreview.type";

export default function MangaPreview({
  onPress,
  onLongPress,
  image,
  provider,
  title,
}: IMangaPreview) {
  return (
    <Container onLongPress={onLongPress} onPress={onPress}>
      <Image resizeMode="cover" source={{ uri: image }} />
      {provider && <ProviderText>{provider}</ProviderText>}
      {title && <Title numberOfLines={1}>{title}</Title>}
    </Container>
  );
}
