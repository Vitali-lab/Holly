import { Router } from "express";
import { addSeason, getSeasons, deleteSeason } from "../controllers/seasons.js";
import { mapSeasons } from "../helpers/mapSeasons.js";

const router = Router();

router.get("/", async (req, res) => {
  const seasons = await getSeasons();
  res.send({ data: seasons.map(mapSeasons) });
});

router.post("/", async (req, res) => {
  const newSeason = await addSeason({ name: req.body.data });
  res.send(mapSeasons(newSeason));
});

router.delete("/:id", async (req, res) => {
  await deleteSeason(req.params.id);
  res.send({ error: null });
});

export const seasonRouter = router;
