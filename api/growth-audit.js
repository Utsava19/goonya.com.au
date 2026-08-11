import { runServerGrowthAudit } from "./lib/growthAudit.mjs";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { business, website, suburb, industry } = body || {};

    if (!business?.trim() || !suburb?.trim() || !industry?.trim()) {
      return res.status(400).json({ error: "Business name, suburb and industry are required." });
    }

    const result = await runServerGrowthAudit({
      business: business.trim(),
      website: (website || "").trim(),
      suburb: suburb.trim(),
      industry: industry.trim(),
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("growth-audit error:", err);
    return res.status(500).json({ error: "Audit failed. Please try again." });
  }
}
