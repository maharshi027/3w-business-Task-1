import multer from "multer";
const upload = multer();

router.post("/signup", upload.none(), signup);
