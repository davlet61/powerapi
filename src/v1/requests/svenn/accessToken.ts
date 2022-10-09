import { axiosRequest } from '$helpers';

export const getToken = async () => {
  const data = JSON.stringify({
    email: 'info@s-glass.no',
    password: 'Suslu123',
  });
  const options = {
    method: 'POST',
    url: `${process.env.SVENN_URL}/login`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  };
  return axiosRequest<any>(options);
};

// : JSON.stringify({
//   email: process.env.SVENN_USER,
//   password: process.env.SVENN_USER_PASS,
// })
