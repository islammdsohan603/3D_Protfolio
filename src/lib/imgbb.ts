/**
 * ImgBB Image Upload Utility Module
 * Handles direct client-side/server-side image binary uploads to ImgBB API.
 */

export async function uploadToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "IMGBB API Key is missing. Please define NEXT_PUBLIC_IMGBB_API_KEY in your environment variables (.env.local)."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ImgBB API responded with HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data && data.success && data.data && data.data.url) {
      return data.data.url as string;
    } else {
      throw new Error(data?.error?.message || "Failed to retrieve uploaded image URL from ImgBB API response.");
    }
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
}
