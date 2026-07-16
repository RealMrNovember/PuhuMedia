"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramFeed({ postUrls }: { postUrls: string[] }) {
  const processEmbeds = React.useCallback(() => {
    window.instgrm?.Embeds.process();
  }, []);

  React.useEffect(() => {
    processEmbeds();
  }, [processEmbeds, postUrls]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {postUrls.map((url) => (
          <blockquote
            key={url}
            className="instagram-media mx-auto w-full"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ minHeight: 400 }}
          />
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />
    </>
  );
}
