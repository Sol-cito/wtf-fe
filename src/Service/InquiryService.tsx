import { InquiryModel } from "../Models/InquiryModel";
import { postApiCall, PostParameter } from "./ApiCall";

export async function sendInquiryAPI(
  request: InquiryModel
): Promise<InquiryModel> {
  const postParameter: PostParameter = {
    url: "inquiry",
    data: request,
  };
  const result: InquiryModel = await postApiCall(postParameter);
  return result;
}
