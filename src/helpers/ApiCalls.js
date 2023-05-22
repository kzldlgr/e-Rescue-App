import axios from "axios";
const baseURL = 'http://localhost:3000/api/v1/';

export const fetchSignUp = async (body) => {
    const res = await axios.post(`${baseURL}auth`, body, { withCredentials: true })
    return res.response;

};

export const fetchSignIn = async (data) => {
    const res = await axios.post(`${baseURL}auth/sign_in`, {
      email: data.email,
      password: data.password,
    });
    return res
  };

// export const fetchSignIn = async (formValues) => {
//     const response = await fetch(`${baseURL}/auth/sign_in`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formValues)
//     });

//     const data = await response.json();
//     sessionStorage.setItem('isLoggedIn', JSON.stringify(data.data))
//     return data;
// }

