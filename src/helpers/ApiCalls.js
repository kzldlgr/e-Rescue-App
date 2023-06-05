import axios from "axios";
const baseURL = 'https://e-rescue-api.onrender.com/api/v1';

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

  const res = await axios.delete(`${baseURL}reports`, {
    headers: {
      Authorization: auth
    },
    data: {
      id: body.id
    }
  });
  return res;
}

export const updateResponder = async (body, auth) => {
  let config = {
    headers: {
      'Authorization': auth,
    }
  }
  const res = await axios.patch(`${baseURL}reports/respond`, body, config)
  return res;
}


export const fetchReports = async (user, auth) => {
  let config = {
    headers: {
      'Authorization': auth,
    }
  }
  const response = await axios.get(`${baseURL}reports`, config);
  const data = response.data;
  const userFilter = data.filter((repe) => repe.user_id !== user.id)
  const statusFilter = userFilter.filter((repe) => repe.status === false)
  return statusFilter
}

export const getHistory = async (header) => {
  let config = {
    headers: {
      'Authorization': header,
    }
  }
  const response = await axios.get(`${baseURL}user/history`, config);
  sessionStorage.setItem("history", JSON.stringify(response.data))
  return response
}


export const fetchUsers = async (auth) => {
  let config = {
    headers: {
      'Authorization': auth,
    }
  }
  const response = await axios.get(`${baseURL}user/loc`, config);
  const data = response.data;
  return data
}
