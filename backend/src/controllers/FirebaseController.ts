import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import firebaseConfig from "../config/firebaseConfig";
import {Request, Response} from 'express';
import multer from "multer"; // Import the Request type from multer

const app = initializeApp(firebaseConfig)
const storage = getStorage();

const upload = multer({storage: multer.memoryStorage()})

const uploadImage = async (req: Request, res: Response) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({
            message: "No file provided or file buffer is unavailable"
        });
    }
    try {
        const storageRef = ref(storage, `blogs/${req.file?.originalname}`)

        const metadata = {
            contentType: "image/jpeg",
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)
        console.log("File successfully uploaded");
        return res.status(200).json({
            message:'File uploaded to firebase storage successfully',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL,
        })
    } catch (error){
        return res.status(400).json(error)
    }
}

export {upload, uploadImage }