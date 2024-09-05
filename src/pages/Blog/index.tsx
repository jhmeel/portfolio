import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ListLayout from "../../components/Layout";
import Footer from "../../components/Footer";
import MetaData from "../../components/MetaData";
import { db } from "../../firebase"; 
import { Article } from "../../Types";
import MLoader from "../../components/MLoader";

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, "articles");
        const articlesQuery = query(articlesCollection, orderBy("postedAt", "desc"));
        const querySnapshot = await getDocs(articlesQuery);
        
        const fetchedArticles: Article[] = [];
        querySnapshot.forEach((doc) => {
          fetchedArticles.push({ id: doc.id, ...doc.data() } as Article);
        });

        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <MLoader/>
  }

  return (
    <>
      <MetaData title="Blog" />
      <ListLayout
        title="Blog"
        posts={articles}
      />
      <Footer />
    </>
  );
};

export default Blog;