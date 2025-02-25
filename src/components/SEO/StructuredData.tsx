import React from 'react';

interface StructuredDataProps {
    type: 'WebSite' | 'Organization' | 'Product' | 'Article' | 'BreadcrumbList';
    data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export const WebsiteStructuredData: React.FC = () => (
    <StructuredData
        type="WebSite"
        data={{
            name: 'Radish',
            url: 'https://radish-markets.vercel.app',
            description: 'Decentralized prediction markets for creator growth metrics across major platforms',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://radish-markets.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        }}
    />
);

export const OrganizationStructuredData: React.FC = () => (
    <StructuredData
        type="Organization"
        data={{
            name: 'Radish',
            url: 'https://radish-markets.vercel.app',
            logo: 'https://radish-markets.vercel.app/logo.png',
            sameAs: [
                'https://twitter.com/radish_bet',
                // Add other social profiles here
            ],
        }}
    />
);

export default StructuredData; 