import { getCartTotal } from './cart'

let errMsg = document.querySelector('.notice.err')
let successMsg = document.querySelector('.notice.success')
let mpesaPhoneNumber = document.querySelector('.mpesa-phone-number')

export function lnm() {
  errMsg.innerHTML = ''
  successMsg.innerHTML = ''
  getOAuthToken()
}
const BASE_URL = process.env.BASE_URL

function getOAuthToken() {
  const url = BASE_URL + '/oauthtoken'
  const options = {
    method: 'GET',
    mode: 'cors',
  }

  fetch(url, options)
    .then(responseStatusCheck)
    .then(responseGetJson)
    .then((responseData) => {
      console.log(responseData)
      makePayment(responseData.data.access_token)
    })
    .catch((err) => {
      console.error(err)
      let errData = err.body.data.data
      errMsg.innerHTML =
        '[Error ' + errData.errorCode + '] ' + errData.errorMessage
    })
}

function makePayment(accessToken) {
  const url = BASE_URL + '/lnm'
  const data = {
    access_token: accessToken,
    amount: getCartTotal(),
    phone: getPhone(),
  }
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }

  fetch(url, options)
    .then(responseStatusCheck)
    .then(responseGetJson)
    .then((data) => {
      console.log(data)
      successMsg.innerHTML = 'Success! Please wait to enter your M-Pesa PIN.'
    })
    .catch((err) => {
      console.error(err)
      let errData = err.body.data.data
      errMsg.innerHTML =
        '[Error ' + errData.errorCode + '] ' + errData.errorMessage
    })
}

async function responseStatusCheck(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    let body = await responseGetJson(response)
    let e = {
      status: response.status,
      body,
    }

    return Promise.reject(e)
  }
}

function responseGetJson(response) {
  // console.log(response)
  return response.json()
}

function getPhone() {
  let phone = mpesaPhoneNumber.value
  return phone.substr(1, phone.length)
}
