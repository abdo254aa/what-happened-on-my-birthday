
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: object;
  type?: 'website' | 'article';
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonicalPath, schema, type = 'article' }) => {
  const location = useLocation();
  const domain = 'https://mybirthday.world'; 
  const url = canonicalPath ? `${domain}${canonicalPath}` : `${domain}${location.pathname}${location.search}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOg = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Set standard SEO tags
    setMeta('description', description);
    setMeta('robots', 'index, follow, max-image-preview:large');
    
    // 4. Set Open Graph tags (Social Sharing)
    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:url', url);
    setOg('og:type', type);
    setOg('og:site_name', 'MyBirthdayFacts');

    // 5. Set Canonical Link (Prevents Duplicate Content issues)
    let linkCanon = document.querySelector('link[rel="canonical"]');
    if (!linkCanon) {
      linkCanon = document.createElement('link');
      linkCanon.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanon);
    }
    linkCanon.setAttribute('href', url);

    // 6. Inject JSON-LD Schema (Rich Snippets)
    if (schema) {
      let scriptSchema = document.getElementById('schema-json-ld');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.id = 'schema-json-ld';
        scriptSchema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    }

    return () => {
       // Cleanup optional: remove schema on unmount to prevent dupes in SPA
       const scriptSchema = document.getElementById('schema-json-ld');
       if (scriptSchema) scriptSchema.textContent = "";
    }
  }, [title, description, url, schema, type]);

  return null;
};

export default SEOHead;
