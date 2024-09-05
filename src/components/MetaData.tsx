import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Host, contact } from "../Types";
const MetaData = ({
  title,
  description,
  img,
  url,
}: {
  title: string;
  description?: string;
  img?: string | Array<string>;
  url?: string;
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title ? title + " | Jhmeel" : "Jhmeel"}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={description} />
        <meta property="og:url" content={`${Host}/${url}`} />
        <meta property="og:type" content={"website"} />
        <meta property="og:site_name" content={"Jhmeel"} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        {Array.isArray(img) ? (
          img.map((uri) => <meta property="og:image" content={uri} key={uri} />)
        ) : (
          <meta property="og:image" content={img} key={img} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={contact.links.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={Host} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jhmeel" />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
