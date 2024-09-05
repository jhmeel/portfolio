import { collection, addDoc } from "firebase/firestore";
import { Article } from "../Types";
import Articles from "../articles"; // Adjust this import path as needed
import { db } from "../firebase";

const uploadArticlesToFirestore = async () => {
  try {
    const articlesCollection = collection(db, "articles");
    
    for (const article of Articles) {
      // Remove the 'id' field if it exists, as Firestore will generate its own
      const { id, ...articleData } = article;
      
      
      // Create a new article document in Firestore
      await addDoc(articlesCollection, {
        ...articleData,
      });
      
      console.log(`Article "${article.title}" uploaded successfully.`);
    }
    
    console.log("All articles uploaded successfully!");
  } catch (error) {
    console.error("Error uploading articles:", error);
  }
};

// Call the function to upload all articles
uploadArticlesToFirestore();