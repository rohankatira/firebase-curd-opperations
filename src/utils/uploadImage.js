// src/utils/uploadImage.js
import { storage } from '../firebase/config'; // Adjust the import based on your setup
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads an image file to Firebase Storage and returns the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Return the download URL
  } catch (error) {
    console.error("Error uploading image:", error); // Log the error
    throw error; // Rethrow the error to handle it in the calling function
  }
};
