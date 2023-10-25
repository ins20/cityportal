import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import {
  userRepository,
  applicationRepository,
  categoryRepository,
} from "./repositories";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
const port = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log(`⚡️[db]: OK`);
  })
  .catch((error) => console.log("DB ERROR: ", error));

app.listen(port, () => {
  try {
    console.log(`⚡️[server]: OK ${port}`);
  } catch (error) {
    console.log("SERVER ERROR: ", error);
  }
});
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post(`/register`, async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await userRepository.save({
      ...req.body,
    });
    res.json(result);
  } catch (error) {
    console.error("Create user error: ", error);
  }
});

app.post(`/login`, async (req: Request, res: Response) => {
  try {
    const result = await userRepository.findOneBy({
      login: req.body.login,
    });
    if (!result) {
      throw new Error("Пользователь не найден");
      return;
    }
    if (result.password === req.body.password) {
      res.json(result);
    } else {
      throw new Error("Не удалось войти");
    }
  } catch (error) {
    console.error("User login error: ", error);
  }
});

app.get(`/user/:id`, async (req: Request, res: Response) => {
  try {
    const result = await userRepository.findOne({
      where: {
        id: +req.params.id,
      },
      relations: {
        applications: true,
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Get user error: ", error);
  }
});

app.post(`/application`, async (req: Request, res: Response) => {
  try {
    const result = await applicationRepository.save({
      ...req.body,
      user: { id: req.body.userId },
      category: { id: req.body.categoryId },
    });
    res.json(result);
  } catch (error) {
    console.log("Create application error: ", error);
  }
});

app.put(`/application/:id`, async (req: Request, res: Response) => {
  try {
    const result = await applicationRepository.update(
      { id: +req.params.id },
      {
        status: req.body.status,
        imageAfter: req.body.imageAfter,
      }
    );
    res.json(result);
  } catch (error) {
    console.log("Update application error: ", error);
  }
});

app.get(`/application`, async (_, res) => {
  try {
    const result = await applicationRepository.find({
      relations: {
        user: true,
      },
    });
    res.json(result);
  } catch (error) {
    console.log("Get application error: ", error);
  }
});

app.delete(`/application/:id`, async (req: Request, res: Response) => {
  try {
    const result = await applicationRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Delete category error: ", error);
  }
});

app.get(`/category`, async (_, res) => {
  try {
    const result = await categoryRepository.find();
    res.json(result);
  } catch (error) {
    console.log("Get category error: ", error);
  }
});

app.post(`/category`, async (req: Request, res: Response) => {
  try {
    const result = await categoryRepository.save({
      ...req.body,
    });
    res.json(result);
  } catch (error) {
    console.error("Create category error: ", error);
  }
});

app.delete(`/category/:id`, async (req: Request, res: Response) => {
  try {
    const result = await categoryRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Create category error: ", error);
  }
});
