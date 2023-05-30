import axios from "axios";
const baseURL = 'http://localhost:3000/api/v1/';

export const fetchSignUp = async (body) => {
  const res = await axios.post(`${baseURL}auth`, body)
  let auth = res.headers.get('Authorization')
  sessionStorage.setItem('auth', JSON.stringify(auth));
  return res
};

// login
export const fetchSignIn = async (data) => {
  const res = await axios.post(`${baseURL}auth/sign_in`, {
    email: data.email,
    password: data.password,
  });

  let user = res.data.user;
  sessionStorage.setItem('user', JSON.stringify(user))
  let auth = res.headers.get('Authorization')
  sessionStorage.setItem('auth', JSON.stringify(auth));
  return res
};

//edit profile
export const patchProfile = async (auth, body) => {
  let config = {
    headers: {
      'Authorization': auth,
    }
  }
  const res = await axios.patch(`${baseURL}user/profile`, body, config)
  return res;

};

//new report
export const sendReport = async (auth, body) => {
  let config = {
    headers: {
      'Authorization': auth,
    }
  }
  const res = await axios.post(`${baseURL}reports/new_report`, body, config)
  return res
}

// saving coords upon login or sign-in
export const saveCoords = async (body) => {
  const res = await axios.patch(`${baseURL}auth`, body)
  return res;
};

export const cancelReport = async (body, auth) => {

  const res = await axios.delete(`${baseURL}/reports`, {
    headers: {
      Authorization: auth
    },
    data: {
      id: body
    }
  });
  return res;
}


