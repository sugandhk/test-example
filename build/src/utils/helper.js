"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sorting = void 0;
const getLimitAndOffset = (page, pageSize) => {
    page = page ? page : 1;
    pageSize = pageSize ? pageSize : 10;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * pageSize;
    return { limit, offset, pageSize };
};
const pagination = (page, pageSize, total) => __awaiter(void 0, void 0, void 0, function* () {
    let pagesize, offset, previouspage, nextpage, totalPages;
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
});
const sorting = (sortField = "createdAt", sortOrder = "ASC") => {
    return [sortField, sortOrder];
};
exports.sorting = sorting;
exports.default = { getLimitAndOffset, pagination, sorting: exports.sorting };
