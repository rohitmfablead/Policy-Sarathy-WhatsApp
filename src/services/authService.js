// import axios from "axios";
// import API, { apiService } from "../config/api";

// // Login API
// export const login = async (credentials) => {
//   const formData = new FormData();
//   for (const key in credentials) {
//     formData.append(key, credentials[key]);
//   }
//   const res = await apiService.post(`${API.ENDPOINTS.login}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return res.data; // { token, user }
// };
// // { token, user } };

// // Get profile API
// export const getProfile = async (token) => {
//   const res = await apiService.get(API.ENDPOINTS.PROFILE, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.user;
// };

// export const updateUserProfile = async (token, profileData) => {
//   const formData = new FormData();
//   for (const key in profileData) {
//     formData.append(key, profileData[key]);
//   }
//   const res = await apiService.put(
//     API.ENDPOINTS.UPDATE,          // <-- your endpoint
//     formData,                   // <-- request body
//     {
//       headers: {
//         // "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// };

// // services/authService.js
// export const changePassword = async (token, passwordData) => {
//   const formData = new FormData();
//   for (const key in passwordData) {
//     formData.append(key, passwordData[key]);
//   }

//   const res = await apiService.put(
//     API.ENDPOINTS.CHANGE_PASSWORD,   // <-- Your change password endpoint
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// };
// services/authService.js
import { apiService } from "../config/api";
import API from "../config/api";

// Login API
export const login = async (credentials) => {
  const formData = new FormData();
  for (const key in credentials) {
    formData.append(key, credentials[key]);
  }
  const res = await apiService.post(`${API.ENDPOINTS.login}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data; // { token, user }
};

// Get profile
export const getProfile = async (token) => {
  const res = await apiService.get(API.ENDPOINTS.PROFILE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.user;
};

// Update profile
export const updateUserProfile = async (token, profileData) => {
  const formData = new FormData();

  // Append all fields except profileImage and companyLogo
  Object.keys(profileData).forEach((key) => {
    if (key !== "profileImage" && key !== "companyLogo") {
      formData.append(key, profileData[key]);
    }
  });

  // Handle profileImage
  if (profileData.profileImage) {
    if (typeof profileData.profileImage !== "string") {
      formData.append("profileImage", profileData.profileImage);
    } else {
      // If it's a string (URL), you can either skip or append as a string,
      // depending on your backend logic.
      // formData.append("profileImage", profileData.profileImage);
    }
  }

  // Handle companyLogo
  if (profileData.companyLogo) {
    if (typeof profileData.companyLogo !== "string") {
      formData.append("companyLogo", profileData.companyLogo);
    } else {
      // If it's a string (URL), you can either skip or append as a string,
      // depending on your backend logic.
      // formData.append("companyLogo", profileData.companyLogo);
    }
  }

  const res = await apiService.post(API.ENDPOINTS.UPDATE, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Change password
export const changePassword = async (token, passwordData) => {
  const formData = new FormData();
  for (const key in passwordData) {
    formData.append(key, passwordData[key]);
  }
  const res = await apiService.put(API.ENDPOINTS.CHANGE_PASSWORD, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
