import { axios } from "../lib/axios";
import { GET, DELETE } from '../lib/actionAxiosTypes'

export async function createRequest({ preCallback, pre_redux_cfg, url, method, body, axios_cfg, extensionHandler, postCallback, redux_cfg }) {
   const userToken = localStorage.getItem('userToken')
      ? localStorage.getItem('userToken')
      : null

   const addToken = (method, body, axios_cfg) => {

      let exp_body;
      let exp_axios_cfg;
      if (method === GET || method === DELETE) {
         const headers = {
            'Authorization': userToken
         }
         exp_body = {
            headers, body,
         }
         exp_axios_cfg = axios_cfg;
         return [exp_body, exp_axios_cfg]
      } else {
         const headers = {
            'Authorization': userToken,
            ...axios_cfg
         }
         exp_axios_cfg = {
            headers
         }
         exp_body = body;
         return [exp_body, exp_axios_cfg]
      }
   }


   try {
      const [exp_body, exp_axios_cfg] = addToken(method, body, axios_cfg);

      let dataBefore = !!preCallback && preCallback();

      !!dataBefore && pre_redux_cfg?.actions.forEach((action) => redux_cfg.dispatch(action(dataBefore)));

      let data = await axios[method](url, exp_body, exp_axios_cfg);
      if (data.status >= 400 || data.code === "ERR_NETWORK") {

         !!extensionHandler && extensionHandler(data);
         throw new Error("server status response: " + data.status);
      }

      let dataAfter = !!postCallback ? postCallback(data) : data;

      redux_cfg?.actions.forEach((action) => redux_cfg.dispatch(action(dataAfter)));

      return dataAfter;

   } catch (error) {
      console.log('----------------------------------------------', error);
      throw new Error("requestGenerator: " + error.message)
   }
}

export const createDownloadRequest = ({ url, postCallback, redux_cfg }) => {
   const userToken = localStorage.getItem('userToken')
      ? localStorage.getItem('userToken')
      : null

   try {

      axios.get(url, { responseType: 'blob', headers: { 'Authorization': userToken, } })
         .then(response => postCallback(response))
         .then(response => { redux_cfg?.actions.forEach((action) => redux_cfg.dispatch(action(response))) })

   } catch (error) {
      throw new Error("requestGenerator: " + error.message)
   }
}