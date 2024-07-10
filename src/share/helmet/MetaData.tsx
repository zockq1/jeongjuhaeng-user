import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaDataProps {
  title: string;
  keywords?: string;
  description: string;
  ogUrl?: string;
  ogType?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const MetaData: React.FC<MetaDataProps> = ({
  title,
  keywords,
  description,
  ogUrl,
  ogType,
  ogImage,
  ogTitle,
  ogDescription,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
    </Helmet>
  );
};

export default MetaData;
