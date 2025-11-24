import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname, join } from "path";

/**
 * storage      |   저장 될 위치 및 파일 이름 제어
 * fileFilter   |   허용 파일 유형 제어
 * limits       |   필드명, 값, 파일 개수, 파일 용량, multiparts 폼의 인수 개수, 헤더 개수 제한 설정
 * preservePath |   파일의 전체 경로를 유지할지 여부
 */

export const multerOption = {
    storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),
        filename: (req, file, cb) => {
            cb(null, randomUUID() + extname(file.originalname))
        }
    })
}