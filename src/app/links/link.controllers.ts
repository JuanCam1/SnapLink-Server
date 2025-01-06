import type { Links } from "@prisma/client";
import type { Context } from "hono";
import type { LinksAllByIdModel } from "./link.models";
import { createLinkService, deleteLinkService, getAllLinksService, getLinkByIdService, updateLinkService } from "./link.services";

export const createLinkController = async (
  c: Context,
  link: Omit<Links, "id" | "slug">
) => {
  await createLinkService(link);
  return c.json({ message: "Link created" }, 201);
}

export const updateLinkController = async (
  c: Context,
  link: Omit<Links, "creatorId">
) => {
  await updateLinkService(link);
  return c.json({ message: "Link updated" }, 200);
}

export const deleteLinkController = async (
  c: Context,
  id: string
) => {
  await deleteLinkService(id);
  return c.json({ message: "Link deleted" }, 200);
}

export const getLinkByIdController = async (
  c: Context,
  id: string
) => {
  const link = await getLinkByIdService(id);
  return c.json(link);
}

export const getAllLinksController = async (
  c: Context,
  data: LinksAllByIdModel
) => {
  const links = await getAllLinksService(data);
  return c.json(links);
}  