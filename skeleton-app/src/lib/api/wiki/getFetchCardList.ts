import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathWikiFetchCardList } from "$lib/constants/paths";
import type { ResponseCardListJson } from "$lib/types/wiki";

async function getFetchCardList(fetchFunction: typeof window.fetch, pageName: string): Promise<ResponseCardListJson> {
  const url = pathWikiFetchCardList.replace(":pageName", pageName);
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseCardListJson;
}

export default getFetchCardList;
