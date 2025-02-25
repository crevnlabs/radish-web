import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Character Set */}
                <meta charSet="utf-8" />

                {/* Favicon */}
                <link rel="icon" href="/logo.png" />
                <link rel="apple-touch-icon" href="/logo.png" />

                {/* Preconnect to domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://radish-markets.vercel.app" />

                {/* Additional SEO meta tags */}
                <meta name="application-name" content="Radish" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                {/* Structured data for rich results */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'Radish',
                            url: 'https://radish-markets.vercel.app',
                            description: 'Decentralized prediction markets for creator growth metrics across major platforms',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://radish-markets.vercel.app/search?q={search_term_string}',
                                'query-input': 'required name=search_term_string'
                            }
                        })
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
} 