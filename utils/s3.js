import S3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'

const region = process.env.AWS_REGION
const accesskey = process.env.AWS_ACCESS_KEY
const secretAccesskey = process.env.AWS_SECRET_KEY
const bucketName = process.env.BUCKECT_NAME

const s3 = new S3({
  region,
  accesskey,
  secretAccesskey,
})

// upload files to s3
const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }
  return s3.upload(uploadParams).promise()
}

export { uploadFile }
