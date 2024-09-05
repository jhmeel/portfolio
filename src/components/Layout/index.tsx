import { Header } from "../Form";
import { useEffect, useState } from "react";
import "./style.scss";
import { FaSearch } from "react-icons/fa";
import Card from "../Card";
import { Article } from "../../Types";

interface Props {
  posts: Array<Article>;
  title: string;
  initialDisplayPosts?: Array<Article>;
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
}: Props) {
  
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogPosts, setFilteredBlogPost] = useState<Array<Article>>([]);

  useEffect(() => {
    const hits = posts.filter((frontMatter: Article) => {
      const searchContent =
        frontMatter.title + frontMatter.summary + frontMatter.tags.join(" ");
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredBlogPost(hits);
  }, [searchValue]);

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  return (
    <>
      <div className="list-layout">
        <Header title={title}>
          <div className="list-layout-search">
            <input
              aria-label="Search articles"
              type="text"
              onChange={({ target }) => setSearchValue(target.value)}
              placeholder="Search articles..."
              className="list-layout-search-input"
            />
            <FaSearch className="icon-search" />
          </div>
        </Header>
        <div className="list-layout-content">
          {!filteredBlogPosts.length && (
            <p className="list-layout-no-results">{"No posts found :("}</p>
          )}
          {displayPosts.map((frontMatter, i) => {
            const { slug, title, summary, tags, postedAt, id, banner } =
              frontMatter;
            return (
              
              <Card
                key={i}
                id={id}
                banner={banner}
                title={title}
                date={postedAt}
                tags={tags}
                description={summary}
                href={slug}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
