export const createFormData = (props: Map<string, string | Blob>): FormData => {
  const formData: FormData = new FormData();

  props.forEach((value, key) => {
    formData.append(key, value);
  });

  return formData;
};
