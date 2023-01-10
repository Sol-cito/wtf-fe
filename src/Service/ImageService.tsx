import { getApiCall, GetParameter } from "./ApiCall";

export async function getImageBySrc(src: string): Promise<File> {
  const getParameter: GetParameter = {
    url: "image",
    params: {
      src: src,
    },
  };
  const result: File = await getApiCall(getParameter);
  return result;
}
