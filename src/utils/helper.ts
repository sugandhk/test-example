import { first } from "lodash";
import db from "../models/index";

const getLimitAndOffset = (page: any, pageSize: any) => {
  page = page ? page : 1;
  pageSize = pageSize ? pageSize : 10;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * pageSize;
  return { limit, offset, pageSize };
};

const pagination = async (page: any, pageSize: any, total: any) => {
  let pagesize: any,
    offset: any,
    previouspage: any,
    nextpage: any,
    totalPages: any;
  page = page ? parseInt(page) : 1;
  pageSize = pageSize ? pageSize : 10;
  pagesize = parseInt(pageSize);
  previouspage = page <= 1 ? null : page - 1;
  nextpage = total / pagesize > page ? page + 1 : null;
  totalPages = total < pageSize ? 1 : Math.ceil(total / pageSize);

  return {
    previousPage: previouspage,
    currentPage: page,
    nextPage: nextpage,
    total: total,
    totalPages: totalPages,
    pageSize: pagesize,
    offset: offset,
  };
};

export const sorting = (sortField = "createdAt", sortOrder = "ASC") => {
  return [sortField, sortOrder];
};


export default { getLimitAndOffset, pagination, sorting };
