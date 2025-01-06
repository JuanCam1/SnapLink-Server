import { z } from "zod";

export const schemaLinkCreate = z.object({
  url: z.string().url(),
  creatorId: z.string(),
})

export const schemaLinkUpdate = z.object({
  id: z.string(),
  url: z.string().url(),
  slug: z.string().min(3).max(50),
})

export const schemaLinkId = z.object({
  id: z.string(),
})

export const schemaLinkGetAll = z.object({
  page: z.number().min(1).max(100),
  pageSize: z.number().min(1).max(100),
  creatorId: z.string(),
})