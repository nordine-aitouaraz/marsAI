const YOUTUBE_REGEX =
  /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;

export function getYouTubeEmbed(url) {
  if (!url) return null;
  const match = url.match(YOUTUBE_REGEX);
  if (match && match[1].length === 11) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export function getYouTubeThumbnail(url) {
  if (!url) return null;
  const match = url.match(YOUTUBE_REGEX);
  if (match && match[1].length === 11) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}
