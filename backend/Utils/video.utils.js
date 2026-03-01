const { getVideoDurationInSeconds } = require("get-video-duration");
const fs = require("fs");
const { promisify } = require("util");
const { execFile } = require("child_process");
const { path: ffprobePath } = require("@ffprobe-installer/ffprobe");

async function getVideoDuration(videoFile) {
  const tmp = "./tmp_video.mp4";
  fs.writeFileSync(tmp, videoFile.buffer);
  const duration = await getVideoDurationInSeconds(tmp);
  fs.unlinkSync(tmp);
  return duration;
}

const execFileAsync = promisify(execFile);

async function getVideoDimensions(videoFile) {
  const tmp = "./tmp_video.mp4";
  fs.writeFileSync(tmp, videoFile.buffer);

  try {
    const { stdout } = await execFileAsync(ffprobePath, [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=s=x:p=0",
      tmp,
    ]);
    const [width, height] = stdout.trim().split("x").map(Number);
    return { width, height };
  } finally {
    fs.unlinkSync(tmp);
  }
}

module.exports = {
  getVideoDuration,
  getVideoDimensions,
};
