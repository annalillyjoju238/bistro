import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Multer
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);



export default foodRouter;
