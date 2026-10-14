import api from "../api/axios";

// =====================================================
// VALIDATE SKIN IMAGE
// =====================================================

export const validateSkinImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post(
    "/api/skin-analysis/validate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =====================================================
// ANALYZE SKIN
// =====================================================

export const analyzeSkin = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post(
    "/api/skin-analysis",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};