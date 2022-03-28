import * as multer from 'multer'
import * as path from 'path'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "public/images/"); // express 생성시 public/images 에 이미지 저장 설정
    }, 
    filename: (req,file,cb) => {
        const ex = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ex) +
        "-" + Date.now() + ex);
    },
})

export default storage