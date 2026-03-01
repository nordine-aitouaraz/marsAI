const FilmSubmissionService = require("../Services/FilmSubmissionService");
const { asyncHandler } = require("../Utils/http");
const {
  getVideoDuration,
  getVideoDimensions,
} = require("../Utils/video.utils");

exports.submit = asyncHandler(async (req, res) => {
  let movie = req.body || {};
  if (req.body && req.body.payload) {
    try {
      movie = JSON.parse(req.body.payload);
    } catch (err) {
      throw new (require("../Utils/http").HttpError)(
        400,
        "Invalid JSON in payload field",
      );
    }
  }

  const { width, height } = await getVideoDimensions(req.file);

  // Tolérance sur le ratio uniquement en mode paysage (16:9, width > height)
  const TARGET_RATIO = 16 / 9;
  const MAX_RELATIVE_DIFF = 0.1; // 10% de marge

  const ratio = width / height;
  const relativeDiff = Math.abs(ratio - TARGET_RATIO) / TARGET_RATIO;

  const isLandscape16by9 = width > height && relativeDiff <= MAX_RELATIVE_DIFF;

  if (!isLandscape16by9) {
    const displayedRatio = ratio.toFixed(2);
    throw new (require("../Utils/http").HttpError)(
      400,
      `Vidéo non conforme (aspect ratio ≈ ${displayedRatio}, dimensions ${width}x${height}), il faut du 16:9 en mode paysage (tolérance 10%).`,
    );
  }

  const duration = await getVideoDuration(req.file);
  if (duration > 60) {
    throw new (require("../Utils/http").HttpError)(
      400,
      "La vidéo dépasse la durée maximale de 1 minute.",
    );
  }

  // On enregistre la durée côté backend (en secondes, arrondie)
  const movieWithDuration = {
    ...movie,
    duration: Math.round(duration),
  };

  const result = await FilmSubmissionService.submit({
    movie: movieWithDuration,
    videoFile: req.file || null,
  });

  res.status(201).json(result);
});
