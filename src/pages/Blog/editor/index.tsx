import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FaUpload, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "./style.scss";
import { db, storage } from "../../../firebase";
import { Article } from "../../../Types";
import { H2 } from "../../../components/Form";
import Viewer from "../viewer";
import { IoMdCloseCircle } from "react-icons/io";
import { MdPublish } from "react-icons/md";

interface BlogEditorProps {
  articleId?: string;
}

const Editor: React.FC<BlogEditorProps> = ({ articleId }) => {
  const [article, setArticle] = useState<Article>({
    banner: "",
    content: "",
    slug: "",
    postedAt: new Date().toDateString(),
    title: "",
    summary: "",
    tags: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (articleId) {
        try {
          const docRef = doc(db, "articles", articleId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setArticle({ id: docSnap.id, ...docSnap.data() } as Article);
          } else {
            toast.error("Article not found");
          }
        } catch (error) {
          console.error("Error fetching article: ", error);
          toast.error("Error fetching article");
        }
      }
    };

    fetchArticle();
  }, [articleId]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => {
      const updatedArticle = { ...prevArticle, [name]: value };

      // Auto-generate slug when title changes
      if (name === "title") {
        updatedArticle.slug = generateSlug(value);
      }

      return updatedArticle;
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setArticle({ ...article, tags });
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const storageRef = ref(storage, `banners/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setArticle({ ...article, banner: downloadURL });
        toast.success("Banner uploaded successfully");
      } catch (error) {
        console.error("Error uploading banner: ", error);
        toast.error("Error uploading banner");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBannerRemove = async () => {
    if (article.banner) {
      try {
        const storageRef = ref(storage, article.banner);
        await deleteObject(storageRef);
        setArticle({ ...article, banner: "" });
        toast.success("Banner removed successfully");
      } catch (error) {
        console.error("Error removing banner: ", error);
        toast.error("Error removing banner");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsPublishing(true);
      if (article.id) {
        const docRef = doc(db, "articles", article.id);
        await updateDoc(docRef, article);
        setIsPublishing(false);
        toast.success("Article updated successfully");
      } else {
        await addDoc(collection(db, "articles"), article);
        setIsPublishing(false);
        toast.success("Article created successfully");
      }
    } catch (error) {
      setIsPublishing(false);
      console.error("Error saving article: ", error);
      toast.error("Error saving article");
    }
  };

  const handlePreviewToggle = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  const previewAnimation = useSpring({
    transform: isPreviewOpen ? "translateY(0%)" : "translateY(100%)",
    opacity: isPreviewOpen ? 1 : 0,
  });

  return (
    <div className="blog-editor">
      <H2>{article.id ? "Edit Article" : "Create New Article"}</H2>
      <form onSubmit={handleSubmit}>
        <div className="form-layout">
          <div className="form-column">
            <div className="form-group banner-upload">
              <label htmlFor="banner">Banner Image</label>
              <div className="banner-preview-container">
                {article.banner ? (
                  <div className="banner-preview">
                    <img src={article.banner} alt="Banner preview" />
                    <button
                      type="button"
                      onClick={handleBannerRemove}
                      className="remove-banner"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="banner-placeholder">
                    {isUploading ? (
                      <button className="buttonUpload" disabled>
                        <span className="dots_loader">Uploading</span>
                      </button>
                    ) : (
                      <>
                        <FaUpload />
                        <span>Upload Banner</span>
                      </>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  id="banner"
                  onChange={handleBannerUpload}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={article.title}
                onChange={handleInputChange}
                required
                placeholder="Enter article title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                name="summary"
                value={article.summary}
                onChange={handleInputChange}
                required
                placeholder="Write a brief summary of the article"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug (auto-generated)</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={article.slug}
                readOnly
                placeholder="Auto-generated from title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={article.tags.join(", ")}
                onChange={handleTagsChange}
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={article.content}
                onChange={handleInputChange}
                required
                placeholder="Write your article content here"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isPublishing||!article.content}>
            {isPublishing ? (
              <FaSpinner
                className="custom-loader"
              />
            ) : (
              <MdPublish />
            )}
            {article.id ? "Republish" : "Publish"}
          </button>
          {article?.content && (
            <button
              type="button"
              className="preview-btn"
              onClick={handlePreviewToggle}
            >
              Preview
            </button>
          )}
        </div>
      </form>

      <animated.div className="preview-drawer" style={previewAnimation}>
        <div className="preview-header">
          <H2>Preview</H2>
          <button
            className="p_close-btn"
            onClick={() => setIsPreviewOpen(false)}
          >
            <IoMdCloseCircle size={20} />
          </button>
        </div>
        <div className="preview-content">
          <Viewer previewArticle={article} />
        </div>
      </animated.div>
    </div>
  );
};

export default Editor;
