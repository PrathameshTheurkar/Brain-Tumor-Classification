import { Request, Response } from "express";
import { z } from "zod";
import { generateAdminToken } from "../middlewares/admin";
import { Admin } from "../db/admin";
import axios from "axios";
import FormData from "form-data";

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUp = async (req: Request, res: Response) => {
  const parsedInput = signUpSchema.safeParse(req.body);

  if (!parsedInput.success) {
    res.status(411).json({
      success: false,
      message: parsedInput.error,
    });
  }

  if (!parsedInput.data) {
    return;
  }

  const { name, email, password } = parsedInput.data;

  const admin = await Admin.findOne({ name, email });
  if (admin) {
    res.status(409).json({
      success: false,
      message: "Admin already exists",
    });
    return;
  }

  const newAdmin = new Admin({ name, email, password });
  await newAdmin.save();

  const token = await generateAdminToken({ name, email });
  res
    .cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
    })
    .json({
      success: true,
      msg: "Admin created Successfully",
    });
};

export const signIn = async (req: Request, res: Response) => {
  const parsedInput = signInSchema.safeParse(req.body);

  if (!parsedInput.success) {
    res.status(411).json({
      success: false,
      message: parsedInput.error,
    });
  }

  if (!parsedInput.data) {
    res.status(411).json({
      success: false,
      message: "Invalid input",
    });
    return;
  }

  const { email, password } = parsedInput.data;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(404).json({
      success: false,
      message: "Admin not found",
    });
    return;
  }

  if (admin.password !== password) {
    res.status(401).json({
      success: false,
      message: "Invalid password",
    });
    return;
  }

  const token = await generateAdminToken({ name: admin.name, email });
  res
    .cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
    })
    .json({
      success: true,
      msg: "Admin logged in Successfully",
    });
};

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(411).json({
      success: false,
      message: "No file found",
    });
    return;
  }

  console.log("req.file: ", req.file);

  // try {
  const formData = new FormData();
  formData.append("image", req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });
  const { data } = await axios.post(
    "http://127.0.0.1:5000/predict",
    //     {
    //     file: req.file.buffer
    // }
    formData,
    {
      // headers: {
      //     'Content-Type': 'multipart/form-data'
      // }
      headers: formData.getHeaders(),
    }
  );

  console.log("data: ", data);

  // } catch (err) {
  //     console.error(err);
  // }
  res.json({
    success: true,
    message: "Image uploaded successfully",
    data,
  });
};

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie("token").json({
    success: true,
    message: "Admin logged out successfully",
  });
};

export const getAdmin = async (req: Request, res: Response) => {
  const admin = await Admin.findOne({ email: req.headers.admin });

  res.json({
    success: true,
    admin,
  });
};
