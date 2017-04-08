
import * as httpLocal from './httpLocalRequest.js';
import * as httpPost from './httpPostRequest.js';
import * as httpGet  from './httpGetRequest.js';

//const serverAddress = 'http://52.30.3.233:3002';
const serverAddress = 'http://localhost:3002';

export const endpoint = src => {
  return `${serverAddress + src}`;
}

export const HttpLocalRequest = httpLocal.HttpLocalRequest;
export const HttpPostRequest = httpPost.HttpPostRequest;
export const HttpGetRequest = httpGet.HttpGetRequest;
