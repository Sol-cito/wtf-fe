import { PlayerModel } from "../Models/PlayerModel";

export const createFormData = (props: Map<string, string | Blob>): FormData => {
  const formData: FormData = new FormData();

  props.forEach((value, key) => {
    formData.append(key, value);
  });

  return formData;
};

export const validatePlayerInputData = (player: PlayerModel) => {
  for (let res of Object.entries(player)) {
    let key: string = res[0];
    let value: string = res[1];
    if (value.length == 0) {
      alert("[Warning] " + key + " 입력되지 않음");
      return false;
    }
  }
  return true;
};
