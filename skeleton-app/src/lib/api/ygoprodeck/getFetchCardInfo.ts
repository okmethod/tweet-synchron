import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathYgoProDeckFetchCardInfo } from "$lib/constants/paths";
import type { ResponseCardInfoJson } from "$lib/types/ygoprodeck";

async function getFetchCardInfo(fetchFunction: typeof window.fetch, enName: string): Promise<ResponseCardInfoJson> {
  const url = pathYgoProDeckFetchCardInfo.replace(":enName", enName);
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseCardInfoJson;
}

export default getFetchCardInfo;
