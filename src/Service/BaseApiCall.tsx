import axios from "axios";

const BaseApiCall = (url: string) => {
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
    })
    .catch((Error) => {
      console.log(Error);
    });
};

export default BaseApiCall;
