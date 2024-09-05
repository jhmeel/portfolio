import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Article, Format } from "../../../Types";
import { FaPlayCircle, FaPauseCircle, FaShareSquare } from "react-icons/fa";
import { formatDate, removeHtmlAndHashTags } from "../../../utils";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "./style.scss";
import Footer from "../../../components/Footer";
import MetaData from "../../../components/MetaData";
import toast from "react-hot-toast";
import MLoader from "../../../components/MLoader";

interface ViewerProps {
  previewArticle?: Article | null;
}

const Viewer: React.FC<ViewerProps> = ({ previewArticle = null }) => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesis | null>(null);
  const [height, setHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (previewArticle) {
        setArticle(previewArticle);
      } else if (slug) {
        try {
          setIsFetchLoading(true);
          const articlesRef = collection(db, "articles");
          const q = query(articlesRef, where("slug", "==", slug));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setArticle({ id: doc.id, ...doc.data() } as Article);
            setIsFetchLoading(false);
          } else {
            setIsFetchLoading(false);
            toast.error("Article not found!");
          }
        } catch (error) {
          setIsFetchLoading(false);
          console.error("Error fetching article:", error);
          toast.error("Error fetching article");
        }
      }
    };

    fetchArticle();
  }, [slug, previewArticle]);

  useEffect(() => {
    const updateScroll = () => {
      const newHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setHeight(newHeight);
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollRef.current) {
        scrollRef.current.style.width = `${(scrollTop / newHeight) * 100}%`;
      }
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (audioEnabled && article) {
      const utterance = new SpeechSynthesisUtterance(
        removeHtmlAndHashTags(article.content)
      );
      speech?.speak(utterance);
    } else {
      speech?.cancel();
    }
  }, [audioEnabled, article, speech]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  useEffect(() => {
    setSpeech(window.speechSynthesis);
  }, []);

  if (!article) {
    return <div className="article-not-found">Article not found</div>;
  }

  const renderContent = () => {
    const codeRegex = /<code>(.*?)<\/code>/gs;
    let content = article.content;
    const matches = content?.match(codeRegex);

    if (matches) {
      matches.forEach((match) => {
        const highlightedCode = hljs.highlightAuto(
          match.replace(/<\/?code>/g, "")
        ).value;
        content = content.replace(
          match,
          `<pre class="code-block"><code>${highlightedCode}</code></pre>`
        );
      });
    }

    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  };

  const handleShare = async () => {
    const imgBlob =
      article.banner && (await fetch(article.banner).then((r) => r.blob()));
    if (navigator.share && imgBlob) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: `https://${window.location.host}/#${article.slug}`,
        files: [new File([imgBlob], "file.png", { type: imgBlob.type })],
      });
    } else {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: `https://${window.location.host}/#${article.slug}`,
      });
    }
  };

  return (
    <>
      {isFetchLoading && <MLoader />}
      <MetaData
        title={article?.title}
        description={article?.summary}
        img={article?.banner}
        url={`https://${window.location.host}/#${article?.slug}`}
      />
      <script type="application/ld+json">
        {`
          {
            "@context":"http://schema.org",
            "@type":"Article",
            "headline":"${article?.title}",
            "datePublished":"${new Date(article?.postedAt)}",
            "author":{
              "@type":"Person",
              "name":"${Format.shortname}
            },
            "description":"${article?.summary}",
            "url":"${`https://${window.location.host}/#${article?.slug}`}",
            "image":"${article?.banner}"
          }
        `}
      </script>
      <div className="art-view-scroll-progress" ref={scrollRef}></div>
      <div className="article-renderer">
        <div className="article-renderer__item">
          {article.banner && (
            <img
              loading="lazy"
              src={article.banner}
              alt={article.title}
              className="article-renderer__header-img"
            />
          )}
          <div className="article-renderer__header">
            <h1 className="article-renderer__title">{article.title}</h1>
            <div className="article-renderer__meta">
              <p className="article-renderer__posted-at">
                {formatDate(article.postedAt)}
              </p>

              <button
                className="article-renderer__audio-btn"
                onClick={toggleAudio}
              >
                {audioEnabled ? (
                  <span style={{ color: "grey" }}>
                    <FaPauseCircle className="article-renderer__audio-icon" />{" "}
                    Stop
                  </span>
                ) : (
                  <span style={{ color: "grey" }}>
                    <FaPlayCircle className="article-renderer__audio-icon" />{" "}
                    Listen
                  </span>
                )}
              </button>
              <div title="share" onClick={handleShare}>
                <FaShareSquare
                  size={20}
                  style={{ color: "grey", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div className="article-renderer__content">{renderContent()}</div>
          <div className="v-article-tags">
            {article.tags?.map((tag: string, i) => (
              <span className="v-tag-item" key={i}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {!previewArticle && <Footer />}
    </>
  );
};

export default Viewer;
