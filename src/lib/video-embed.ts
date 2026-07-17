const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
  /(?:youtu\.be\/)([\w-]{11})/,
  /(?:youtube\.com\/embed\/)([\w-]{11})/,
  /(?:youtube\.com\/shorts\/)([\w-]{11})/,
];

export function getYoutubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getYoutubeEmbedUrl(
  url: string,
  options: { autoplay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean } = {}
): string | null {
  const id = getYoutubeVideoId(url);
  if (!id) return null;

  const { autoplay = false, muted = false, loop = false, controls = true } = options;
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    controls: controls ? "1" : "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
  });
  if (loop) {
    params.set("loop", "1");
    params.set("playlist", id);
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function isValidVideoUrl(url: string): boolean {
  return getYoutubeVideoId(url) !== null;
}
