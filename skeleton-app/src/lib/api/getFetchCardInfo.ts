import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathParseFetchCardInfo } from "$lib/constants/paths";
import type { ResponseCardInfoJson } from "$lib/types/parser";

async function getFetchCardInfo(fetchFunction: typeof window.fetch, pageName: string): Promise<ResponseCardInfoJson> {
  const url = pathParseFetchCardInfo.replace(":pageName", pageName);
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseCardInfoJson;
}

export default getFetchCardInfo;
