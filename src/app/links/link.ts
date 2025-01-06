import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { validateErrorCatch } from "../../libs/validateErrorCatch";
import { createLinkController, deleteLinkController, getAllLinksController, getLinkByIdController, updateLinkController } from "./link.controllers";
import { schemaLinkCreate, schemaLinkGetAll, schemaLinkUpdate } from "./link.middlewares";

const linkRouter = new Hono();

linkRouter.post("/", zValidator("json", schemaLinkCreate), async (c) => {
  try {
    const link = c.req.valid("json");
    return await createLinkController(c, link);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    validateErrorCatch(c, error);
  }
});

linkRouter.patch("/:id", zValidator("json", schemaLinkUpdate), async (c) => {
  try {
    const link = c.req.valid("json");
    return await updateLinkController(c, link);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    validateErrorCatch(c, error);
  }
});

linkRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    return await deleteLinkController(c, id);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    validateErrorCatch(c, error);
  }
});

linkRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    return await getLinkByIdController(c, id);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    validateErrorCatch(c, error);
  }
});

linkRouter.get("/", zValidator("json", schemaLinkGetAll), async (c) => {
  try {
    const data = c.req.valid("json");
    return await getAllLinksController(c, data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    validateErrorCatch(c, error);
  }
});

export default linkRouter;

