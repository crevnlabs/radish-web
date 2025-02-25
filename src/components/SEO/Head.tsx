import React from 'react';
import Head from 'next/head';

interface SEOHeadProps {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'Radish - Bet on your favorite creators and earn rewards',
    description = 'Decentralized prediction markets for creator growth metrics across YouTube, Twitter, TikTok, and Instagram. Place bets on creator growth and rivalry outcomes.',
    canonicalUrl = 'https://radish-markets.vercel.app',
    ogImage = '/logo.png',
    ogType = 'website',
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Radish" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:creator" content="@radish_bet" />

            {/* Favicon */}
            <link rel="icon" href="/logo.png" />
            <link rel="apple-touch-icon" href="/logo.png" />
        </Head>
    );
};

export default SEOHead; 