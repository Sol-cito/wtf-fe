export const createFormData = (props: Map<string, string | Blob>): FormData => {
  const formData: FormData = new FormData();

  props.forEach((value, key) => {
    formData.append(key, value);
  });

  return formData;
};

export const getImageFileNameWithExtension = (props?: string): string => {
  if (!props) return "";
  let splitArr: string[] = props.split("/");
  if (splitArr.length > 1) {
    return splitArr[splitArr.length - 1];
  }
  return splitArr[0];
};
