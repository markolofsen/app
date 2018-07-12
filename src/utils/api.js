// console.log( process.env )


// export const apiDomain = 'http://127.0.0.1:8000';
export const apiDomain = 'https://tenerifebook.com';
// export const apiDomain = 'http://192.168.1.128:8000';
export const webDomain = 'https://tenerifebook.com';
/*
 * UNIVERSAL FETCHERS
 */
import axios from 'axios';
export async function get(path) {
	return await axios.get(`${apiDomain}${path}`).then(res => res.data)
}

import i18n from 'i18next';
import {Linking} from 'react-native';
export function handleClick(url, type=false) {

	let url_ = type == 'self' ? `${webDomain}/${i18n.language}/${url}` : url

  Linking.canOpenURL(url_).then(supported => {
    if (supported) {
      Linking.openURL(url_);
    } else {
			alert('Error')
      console.log("Don't know how to open URI: " + url_);
    }
  });
};

// Token for API Authorization
let GLOBAL_RESPONSE_STATUS = true
function applyAxiosSettings() {
    axios.defaults.headers.common['Authorization'] = `Token TOKENBUMBER`;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.interceptors.response.use(response => {
        // soundsCollection('connection_error', false)

        GLOBAL_RESPONSE_STATUS = true
        return response;
    }, error => {

        // soundsCollection('connection_error', true)

        if (!error.response) {
            // console.log('Network error!')
            GLOBAL_RESPONSE_STATUS = 'Network error!'
        } else {
            console.log(error.response.status)
            GLOBAL_RESPONSE_STATUS = error.response.status
            return error.response
        }
        return Promise.reject(error.response);
    })


} applyAxiosSettings()
