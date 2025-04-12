import sharp from "sharp";
import { constructRequestInit, fetchApi } from "../utils/request.js";
import { pathPostTweet } from "../constants/paths.js";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "../types/twitter";

async function postPostTweet(
  fetchFunction: typeof window.fetch,
  accountPassphrase: string,
  tweetText: string,
  imageUrl: string | null = null,
  inReplyToTweetId: string | null = null,
): Promise<ResponsePostTweetJson> {
  const url = pathPostTweet;
  const mediaData = imageUrl ? await imageUrlToBase64(fetchFunction, imageUrl, 400) : null;
  const mediaFileBase64 = mediaData?.base64String ?? null;
  const mediaMimeType = mediaData?.mimeType ?? null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const requestInit = constructRequestInit(headers);
  const requestBody: RequestPostTweetJson = {
    accountPassphrase,
    tweetText,
    mediaFileBase64: mediaFileBase64 ?? undefined,
    mediaMimeType: mediaMimeType ?? undefined,
    inReplyToTweetId: inReplyToTweetId ?? undefined,
  };
  const requestConfig = {
    ...requestInit,
    method: "POST",
    body: JSON.stringify(requestBody),
  };
  try {
    const response = await fetchApi(fetchFunction, url, requestConfig);
    return (await response.json()) as ResponsePostTweetJson;
  } catch {
    return { tweetId: null };
  }
}

async function imageUrlToBase64(
  fetchFunction: typeof fetch,
  imageUrl: string,
  edgeLength: number,
): Promise<{ base64String: string; mimeType: string }> {
  const response = await fetchFunction(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  const imageFormat = (response.headers.get("Content-Type")?.split("/")[1] as keyof sharp.FormatEnum) ?? "jpeg";
  const processedBuffer = await processImage(Buffer.from(arrayBuffer), edgeLength, imageFormat);

  const base64String = Buffer.from(processedBuffer).toString("base64");
  const mimeType = `image/${imageFormat}`;
  return { base64String, mimeType };
}

async function processImage(imageBuffer: Buffer, edgeLength: number, imageFormat: string): Promise<Buffer> {
  if (!sharp.format[imageFormat as keyof sharp.FormatEnum]) {
    throw new Error(`Unsupported image format: ${imageFormat}`);
  }

  const metadata = await sharp(imageBuffer).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Failed to retrieve image metadata");
  }

  // 縦長画像の場合、正方形にトリミング（上部分を残し、下部分を切り捨てる）
  const isPortrait = metadata.height > metadata.width;
  const cropHeight = isPortrait ? metadata.width : metadata.height;

  return sharp(imageBuffer)
    .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight }) // トリミング
    .resize(edgeLength, edgeLength)
    .toFormat(imageFormat as keyof sharp.FormatEnum)
    .toBuffer();
}

export default postPostTweet;
