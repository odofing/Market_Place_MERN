import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import util from 'util'
import { uploadFile } from '../utils/s3.js'
const router = express.Router()

const unLinkFile = util.promisify(fs.unlink)

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file
  const result = await uploadFile(file)
  // remove file from upload folder after upload
  await unLinkFile(file.path)
  if (result) {
    return res.status(200).json(result.Location)
  } else {
    return res.status(400).json('Image could not be uploaded')
  }
})

export default router
