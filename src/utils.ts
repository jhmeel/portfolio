export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  
  export function generateSlug(title: string): string {
    // Remove leading/trailing spaces
    const trimmedTitle = title.trim();
  
    // Replace non-word characters with hyphens
    const slugifiedTitle = trimmedTitle.replace(/\W+/g, '-');
  
    // Convert to lowercase
    const lowercaseSlug = slugifiedTitle.toLowerCase();
  
    // Remove any consecutive hyphens and leading/trailing hyphens
    const cleanedSlug = lowercaseSlug.replace(/\-+/g, '-').replace(/^\-|\-$/g, '');
  
    return cleanedSlug;
  }

  export const formatDate = (date: string): string | undefined => {
    return date
  };

  export function removeHtmlAndHashTags(caption: string): string {
    // Replace #/ with an empty string
    caption = caption.replace(/#\/+/g, "");
  
    // Replace HTML elements with an empty string
    caption = caption.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");
  
    // Replace ## with an empty string
    caption = caption.replace(/##/g, "");
  
    return caption;
  }