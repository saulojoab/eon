import api from "@/services/api";

export function getImageProxy(image: string, provider: string) {
  const encoded = encodeURIComponent(image);

  const encodedReferer = encodeURIComponent(
    JSON.stringify({ Referer: provider })
  );

  return `${api.defaults.baseURL}/utils/image-proxy?url=${encoded}&headers=${encodedReferer}`;
}
