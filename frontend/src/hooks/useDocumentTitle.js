import { useEffect } from 'react';

/**
 * Custom hook to set the document title
 * @param {string} title - The title to set
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
