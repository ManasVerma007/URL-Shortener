const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const shortId = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user.id,
  });
  return res.render("home2",{
    id:shortId,
  })
}

// async function handleShowAllURL(req, res) {
//   try {
//     const allUrls = await URL.find({});
//     const html = `
//     <html>
//     <head></head>
//     <body>
//     <ol>
//     ${allUrls
//       .map(
//         (url) =>
//           `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`
//       )
//       .join("")}
//     </ol>
//     </body>
//     </html>
//     `;
//     res.send(html);
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function handleShowAllURL(req, res) {
//   const allUrls = await URL.find({});
//   res.render("home",{
//     urls: allUrls,
//   })
// }

async function handlegetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleVistURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handlegetAnalytics,
  handleVistURL,
};
