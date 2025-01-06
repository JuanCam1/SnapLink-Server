import type { Links } from "@prisma/client"
import { prisma } from "../../libs/prisma"
import { generateSlug } from "../../utils/generateSlug";
import type { LinksAllByIdModel } from "./link.models"


export const createLinkService = async (link: Omit<Links, "id" | "slug">) => {

  const isExistLink = await prisma.links.findFirst({
    where: {
      url: link.url,
    },
  });

  if (isExistLink) {
    throw new Error("Link already exists");
  }


  const shortUrl = generateSlug(8);
  const username = await prisma.user.findUnique({
    where: {
      id: link.creatorId,
    },
    select: {
      username: true,
    },
  });

  if (!username) {
    throw new Error("User not found");
  }

  const slug = `https://${username?.username}.in/${shortUrl}`;
  return await prisma.links.create({
    data: {
      url: link.url,
      slug: slug,
      creatorId: link.creatorId,
    },
  })
}

export const updateLinkService = async (link: Omit<Links, "creatorId">) => {

  const linkExists = isExistLink(link.slug);

  if (!linkExists) {
    throw new Error("Link not found");
  }

  return await prisma.links.update({
    where: {
      id: link.id,
    },
    data: link,
  })
}

export const deleteLinkService = async (id: string) => {
  return await prisma.links.delete({
    where: {
      id: id,
    },
  })
}

export const getLinkByIdService = async (id: string) => {
  return await prisma.links.findUnique({
    where: {
      id: id,
    },
  });
}


export const getAllLinksService = async (data: LinksAllByIdModel) => {
  const { page, pageSize, creatorId } = data;
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const links = await prisma.links.findMany({
    where: {
      creatorId: creatorId
    },
    skip: skip,
    take: take,
    select: {
      id: true,
      url: true,
      slug: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
        },
      }
    },
    orderBy: {
      id: "desc",
    },
  })

  const totalRecordes = await prisma.links.count();
  const totalPages = Math.ceil(totalRecordes / pageSize);

  const response = {
    data: links,
    currentPage: page,
    pageSize: pageSize,
    totalPages: totalPages,
    totalRecords: totalRecordes,
  };
  return response;
}


const isExistLink = async (slug: string) => {
  const link = await prisma.links.findUnique({
    where: {
      slug: slug,
    },
  });
  return link;
}