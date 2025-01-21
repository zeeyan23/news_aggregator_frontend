import axios from "axios";
import { mainURL } from "../Utils/urlis";

export const saveToReadLater = async (userId, articleId, newsType) => {
  try {
    const response = await axios.post(`${mainURL}/api/read_later`, {
      user_id:userId,
      news_id:articleId,
      news_type: newsType,
    });
    if (response.status === 201) {
      return { success: true, message: "Article saved to Read Later!" };
    } else {
      return { success: false, message: "Failed to save article. Please try again." };
    }
  } catch (error) {
    console.error("Error saving to Read Later:", error);
    return { success: false, message: "An error occurred while saving the article." };
  }
};
