import type { GetAllModel } from "../../models/getAll.model";

export interface LinksAllByIdModel extends GetAllModel {
  creatorId: string;
}