import { Router } from "express";
import fs from "fs";
import path from "path";
import formidable from "formidable";

import { UploadImage } from "../models/UploadImage.js";

const router = Router();

const normalizeField = (value, fallback = "") => {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }
  if (value === undefined || value === null) {
    return fallback;
  }
  return value;
};

export const createUploadRoutes = ({ rootDir, uploadsDir }) => {
  router.get("/create", (req, res) => {
    res.sendFile(path.join(rootDir, "create.html"));
  });

  router.post("/create", async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).send(err);

      const fileObj = Array.isArray(files.imageFile)
        ? files.imageFile[0]
        : files.imageFile;

      if (!fileObj) {
        return res.status(400).send("Файл не получен");
      }

      const tempPath = fileObj.filepath;
      const fileName = fileObj.originalFilename;
      const targetPath = path.join(uploadsDir, fileName);

      fs.rename(tempPath, targetPath, async (renameErr) => {
        if (renameErr) return res.status(500).send(renameErr);

        try {
          const newUploadImage = new UploadImage({
            title: normalizeField(fields.title, fileName),
            content: normalizeField(fields.content, ""),
            price: Number(normalizeField(fields.price, 0)),
            sale: Number(normalizeField(fields.sale, 0)),
            imagePath: `/uploads/${fileName}`,
          });

          await newUploadImage.save();
          res.json({ data: newUploadImage });
        } catch (saveErr) {
          res.status(400).send(saveErr);
        }
      });
    });
  });

  return router;
};

