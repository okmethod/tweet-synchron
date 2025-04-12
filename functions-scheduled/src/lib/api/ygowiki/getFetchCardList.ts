import { constructRequestInit, fetchApi } from "../../utils/request.js";
import { pathYgoWikiFetchCardList } from "../../constants/paths.js";
import type { ResponseCardListJson } from "../../types/ygowiki";

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
