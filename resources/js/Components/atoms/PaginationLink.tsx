import { cn } from "@/utils/common";
import { Link } from "@inertiajs/react";
import { FC } from "react";

export interface IPaginationLink {
  url: null | string;
  label: string;
  active: boolean;
}

const PaginationLink: FC<IPaginationLink> = ({ active, label, url }) => {
  const className = cn(
    "mr-1 mb-1 px-4 py-3 border border-solid border-gray-300 rounded text-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:border-indigo-700 focus:text-indigo-700",
    active && "bg-blue-600 text-white"
  );

  /**
   * Note: In general you should be aware when using `dangerouslySetInnerHTML`.
   *
   * In this case, `label` from the API is a string, so it's safe to use it.
   * It will be either `&laquo; Previous` or `Next &raquo;`
   */
  return (
    <Link className={className} href={url as string}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </Link>
  );
};

export default PaginationLink;
