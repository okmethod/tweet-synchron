export async function loadCsv(
  fetchFunction: typeof window.fetch,
  fileName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [key: string]: any }> {
  console.debug("loading: ", fileName);
  try {
    const filePath = `/${fileName}`;
    const response = await fetchFunction(filePath);
    const blob = await response.blob();
    const text = await blob.text();
    return parseCsvWithHeader(text);
  } catch (error) {
    console.error(`failed to load ${fileName}:`, error);
    throw error;
  }
}

function parseCsvWithHeader(text: string): Array<Record<string, string>> {
  const [headerLine, ...lines] = text.trim().split("\n");
  const headers = headerLine.split(",");

  return lines.map((line) => {
    const values = line.split(",");
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index];
    });
    return record;
  });
}
