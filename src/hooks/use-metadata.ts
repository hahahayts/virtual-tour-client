// hooks/useMetadata.ts
import { useEffect } from "react";

type Metadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonicalUrl?: string;
};

export const useMetadata = ({
  title = "Bohol Tourism",
  description = "Discover amazing places in Bohol",
  keywords = ["Bohol", "travel", "tourism"],
  image,
  canonicalUrl,
}: Metadata) => {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Create or update description meta tag
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", description);

    // Create or update keywords meta tag
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement("meta");
      keywordsTag.setAttribute("name", "keywords");
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute("content", keywords.join(", "));

    // Set Open Graph/Facebook meta tags
    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href },
      ...(image ? [{ property: "og:image", content: image }] : []),
    ];

    metaTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Set canonical URL if provided
    if (canonicalUrl) {
      let linkTag = document.querySelector('link[rel="canonical"]');
      if (!linkTag) {
        linkTag = document.createElement("link");
        linkTag.setAttribute("rel", "canonical");
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute("href", canonicalUrl);
    }

    // Cleanup function
    return () => {
      document.title = "Bohol Tourism"; // Reset to default
    };
  }, [title, description, keywords, image, canonicalUrl]);
};
