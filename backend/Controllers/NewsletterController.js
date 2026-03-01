const NewsletterService = require('../Services/NewsletterService');
const { asyncHandler } = require('../Utils/http');

exports.listSubscribers = asyncHandler(async (req, res) => {
  const data = await NewsletterService.listSubscribers();
  res.json(data);
});

exports.send = asyncHandler(async (req, res) => {
  const { subject, text } = req.body || {};
  const result = await NewsletterService.sendNewsletter({ subject, text });
  res.status(200).json(result);
});

exports.subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body || {};
  const result = await NewsletterService.subscribe(email);
  res.status(201).json(result);
});
