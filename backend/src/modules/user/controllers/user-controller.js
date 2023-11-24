import { userService } from "../services/user-service.js";
import fs from "fs";
export const login = async (request, response, next) => {
  const user = request.body;
  try {
    const userInfo = await userService.login(user);

    if (userInfo.user) {
      return response.status(200).json({ ...userInfo });
    }

    return response.status(403).json({ error: "incorrect password or mail" });
  } catch (err) {
    next(err);
  }
};

export const register = async (request, response, next) => {
  try {
    const { files } = request;
    let user = request.body;

    const uploadedFile = files.image;

    const uploadPath = "./src/uploads";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const timeStamp = new Date();

    const imagePath = `${timeStamp.getTime()}${uploadedFile.name}`;

    uploadedFile.mv(
      `${uploadPath}/${timeStamp.getTime()}${uploadedFile.name}`,
      (err) => {
        if (err) {
          return response.status(500).json({ err: err });
        }
      }
    );

    user = { ...user, "profile-image-path": imagePath };
    const doc = await userService.register(user);
    response.status(200).json(doc);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    const id = request.decoded.id;
    const doc = await userService.getUserById(id);
    response.status(200).json(doc);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const userProfileImage = async (request, response, next) => {
  try {
    response.sendFile(
      `/home/hariom/Desktop/dit/backend/src/uploads/${request.params.path}`
    );
  } catch (err) {
    console.error(err);
    next(err);
  }
};
