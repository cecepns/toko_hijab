import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}; 