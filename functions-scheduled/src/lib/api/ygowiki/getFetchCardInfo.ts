import { constructRequestInit, fetchApi } from "../../utils/request.js";
import { pathYgoWikiFetchCardInfo } from "../../constants/paths.js";
import type { ResponseCardInfoJson } from "../../types/ygowiki";

async function getFetchCardInfo(fetchFunction: typeof window.fetch, jaName: string): Promise<ResponseCardInfoJson> {
  const url = pathYgoWikiFetchCardInfo.replace(":jaName", jaName);
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseCardInfoJson;
}

export default getFetchCardInfo;
