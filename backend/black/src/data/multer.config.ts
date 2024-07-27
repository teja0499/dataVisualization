import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const randomName = Math.random().toString(36).substring(7);
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
