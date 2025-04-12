import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathYgoWikiFetchCardList } from "$lib/constants/paths";
import type { ResponseCardListJson } from "$lib/types/ygowiki";

async function getFetchCardList(fetchFunction: typeof window.fetch, pageName: string): Promise<ResponseCardListJson> {
  const url = pathYgoWikiFetchCardList.replace(":pageName", pageName);
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseCardListJson;
}

export default getFetchCardList;
