import { useEffect } from 'react';

/**
 * Custom hook to set the meta description
 * @param {string} description - The description to set
 */
export const useMetaDescription = (description) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="description"]');
    const previousDescription = metaTag ? metaTag.content : '';
    
    if (metaTag) {
      metaTag.content = description;
    }
    
    return () => {
      if (metaTag) {
        metaTag.content = previousDescription;
      }
    };
  }, [description]);
};

export default useMetaDescription;
