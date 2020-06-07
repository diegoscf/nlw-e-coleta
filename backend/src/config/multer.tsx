import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(requisicao, arquivo, funcaoDeRetorno) {
            const hash = crypto.randomBytes(6).toString('hex');

            const nomeDoArquivo = `${hash}_${arquivo.originalname}`;

            funcaoDeRetorno(null, nomeDoArquivo);
        }
        //filename: () => {}
    }),
}

//fileFilter é usado para validar extensão