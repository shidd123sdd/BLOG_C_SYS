import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options).then(res => {
    if (res.data.state === 0) {
      notification.error({
        message: res.data.message
      });
      return Promise.reject("error");
    }
    return res.data;
  });
}

export default request;
