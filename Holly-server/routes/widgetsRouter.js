import { Router } from "express";
import {
  addWidget,
  deleteWidget,
  editWidget,
  fetchWidgets,
} from "../controllers/widgets.js";
import { mapWidgets } from "../helpers/mapWidgets.js";

const router = Router();

(fetchWidgets, addWidget, deleteWidget);

router.get("/", async (req, res) => {
  const widgets = await fetchWidgets();
  res.send({ data: widgets.map(mapWidgets) });
});

router.post("/", async (req, res) => {
  const newWidget = await addWidget(req.body);
  res.send(mapWidgets(newWidget));
});

router.delete("/:id", async (req, res) => {
  await deleteWidget(req.params.id);
  res.send({ error: null });
});

router.patch("/:id", async (req, res) => {
  const newWidget = await editWidget(req.params.id, req.body);
  res.send(mapWidgets(newWidget));
});

export const widgetsRouter = router;
