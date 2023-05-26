import axios from "axios";
const baseURL = 'http://localhost:3000/api/v1/';

export const fetchSignUp = async (body) => {
  const res = await axios.post(`${baseURL}auth`, body)
  let auth = {
    'Authorization': res.headers.get('Authorization')
  }
  sessionStorage.setItem('Auth', JSON.stringify(auth));

  return res;

};

// login
export const fetchSignIn = async (data) => {
  const res = await axios.post(`${baseURL}auth/sign_in`, {
    email: data.email,
    password: data.password,
  });

  console.log(res.headers)

  let auth = res.headers.get('Authorization')

  sessionStorage.setItem('Auth', JSON.stringify(auth));

  return res
};

//edit profile
export const patchProfile = async (auth, body) => {
  console.log(body)
  let config = {
    headers: {
      'Authorization': auth,
    }
  }
  const res = await axios.patch(`${baseURL}profile`, body, config)
  console.log(res)
  return res;

};
