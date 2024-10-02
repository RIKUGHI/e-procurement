import { IPaginatedMeta } from "@/types";
import { FC } from "react";
import { PaginationLink } from "../atoms";

interface IPagination {
  meta: IPaginatedMeta;
}

const Pagination: FC<IPagination> = ({ meta: { total, links } }) => {
  if (links.length === 3) return null;

  return (
    <div className="flex flex-wrap items-center mb-1">
      <span className="text-sm mr-5">Total {total} data</span>
      {links.map((link) => {
        return link.url === null ? null : (
          <PaginationLink key={link.label} {...link} />
        );
      })}
    </div>
  );
};

export default Pagination;
