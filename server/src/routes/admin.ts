import express from 'express';
import { getAdmin, signIn, signOut, signUp, uploadImage } from '../controllers/admin';
import { authenticateAdminToken } from '../middlewares/admin';
import multer  from 'multer';
// const upload = multer({ dest: 'uploads/' })

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', authenticateAdminToken, signOut);
router.post('/upload-image', upload.single('image'), authenticateAdminToken, uploadImage);
router.get('/admin/me', authenticateAdminToken, getAdmin);

export default router;