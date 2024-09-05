import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";
import { FaShare, FaEllipsisH } from "react-icons/fa";
import "./style.scss";
import toast from "react-hot-toast";

interface CardProps {
  title: string;
  description: string;
  href: string;
  date: string;
  tags: string[];
  banner: string;
  id: string;
}

function Card({
  title,
  description,
  href,
  date,
  tags,
  banner,
  id,
}: CardProps): React.ReactElement {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.origin + `/blog/article/${href}`,
      });
    } else {
      toast.error("Share functionality not supported on this browser");
    }
  };

  return (
    <div className="article">
      {banner && (
        <div className="article-banner">
          <img src={banner} alt={title} />
        </div>
      )}
      <div className="article-content">
        <div className="article-header">
          <dl>
            <dd className="article-date">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>

          <div className="article-menu" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="menu-button"
              aria-label="Open menu"
            >
              <FaEllipsisH />
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button onClick={handleShare} className="menu-item">
                  <FaShare /> Share
                </button>
              </div>
            )}
          </div>
        </div>
        <h2 className="article-title">
          <Link to={`/blog/article/${href}`} aria-label={`Link to ${title}`}>
            {title}
          </Link>
        </h2>
        <div className="article-tags">
          {tags.map((tag: string, i) => (
            <span className="tag-item" key={i}>
              #{tag}
            </span>
          ))}
        </div>
        <p className="article-description">{description}</p>
        <Link
          to={`/blog/article/${href}`}
          className="article-link"
          aria-label={`Link to ${title}`}
        >
          Learn more &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Card;