import sharp from "sharp";

export async function imageUrlToBase64(
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
  const resizedBuffer = await resizeImage(Buffer.from(arrayBuffer), edgeLength, imageFormat);

  const base64String = Buffer.from(resizedBuffer).toString("base64");
  const mimeType = `image/${imageFormat}`;
  return { base64String, mimeType };
}

async function resizeImage(imageBuffer: Buffer, edgeLength: number, imageFormat: string): Promise<Buffer> {
  if (!sharp.format[imageFormat as keyof sharp.FormatEnum]) {
    throw new Error(`Unsupported image format: ${imageFormat}`);
  }

  const metadata = await sharp(imageBuffer).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Failed to retrieve image metadata");
  }

  // 縦長画像の場合、正方形にトリミングする（上部分を残し、下部分を切り捨てる）
  const cropHeight = metadata.height > metadata.width ? metadata.width : metadata.height;

  return sharp(imageBuffer)
    .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
    .resize(edgeLength, edgeLength)
    .toFormat(imageFormat as keyof sharp.FormatEnum)
    .toBuffer();
}
