import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathWikiFetchCardInfo } from "$lib/constants/paths";
import type { ResponseCardInfoJson } from "$lib/types/wiki";

async function getFetchCardInfo(fetchFunction: typeof window.fetch, pageName: string): Promise<ResponseCardInfoJson> {
  const url = pathWikiFetchCardInfo.replace(":pageName", pageName);
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseCardInfoJson;
}

export default getFetchCardInfo;
