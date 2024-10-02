import { cn } from "@/utils/common";
import { Link } from "@inertiajs/react";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { FaAngleRight } from "react-icons/fa6";

interface IMenu {
  icon: IconType;
  label: string;
  hrefs:
    | string
    | {
        label: string;
        href: string;
      }[];
}

const Menu: FC<IMenu> = ({ icon: Icon, label, hrefs }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);

  const getExpandedRoutes = (href: string): string => {
    if (href.split(".").length === 1) return href;
    return href.split(".")[0] + ".*";
  };

  const isActive = Array.isArray(hrefs)
    ? hrefs.some(({ href }) => route().current(getExpandedRoutes(href)))
    : route().current(getExpandedRoutes(hrefs));

  return Array.isArray(hrefs) ? (
    <li>
      <button
        className={cn(
          "flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
          isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
        )}
        type="button"
        onClick={handleOpen}
      >
        <Icon
          className={cn(
            "size-6 flex-shrink-0",
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 text-gray-400"
          )}
        />
        {label}
        <FaAngleRight
          className={cn(
            "ml-auto size-4 flex-shrink-0",
            open || isActive ? "rotate-90" : "text-gray-500"
          )}
        />
      </button>
      {(open || isActive) && (
        <ul className="mt-1 px-2">
          {hrefs.map(({ label, href }, i) => (
            <li key={i}>
              <Link
                href={route(href)}
                className={cn(
                  "block rounded-md py-2 pl-9 pr-2 text-sm leading-6 font-medium",
                  route().current(getExpandedRoutes(href))
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50 text-gray-700"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  ) : (
    <li>
      <Link
        href={route(hrefs)}
        className={cn(
          "flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
          isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
        )}
      >
        <Icon
          className={cn(
            "size-6 flex-shrink-0",
            isActive ? "text-white" : "text-gray-400"
          )}
        />
        {label}
      </Link>
    </li>
  );
};

export default Menu;
