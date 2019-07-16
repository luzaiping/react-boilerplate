// import fetch from 'isomorphic-fetch';
import axios from 'axios';

export default function request(url) {
  const setting = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };

  return axios.get(url, setting)
    .then((response) => {
      const { data, status } = response;
      return status === 200 ? data : Promise.reject(Error('res status is not ok.'));
    })
    .catch(e => Promise.reject(e));
}
