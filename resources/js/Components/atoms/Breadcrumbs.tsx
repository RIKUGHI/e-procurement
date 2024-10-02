import { cn } from "@/utils/common";
import { Link } from "@inertiajs/react";
import { FC } from "react";

export interface IBreadcrumbLink {
  label: string;
  href: string;
}

interface IBreadcrumbs {
  links: IBreadcrumbLink[];
}

const Breadcrumbs: FC<IBreadcrumbs> = ({ links }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {links.map(({ label, href }, i) => (
          <li
            key={i}
            className={cn(i === 0 ? "inline-flex" : "flex", " items-center")}
          >
            {i > 0 && (
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            )}
            {i === links.length - 1 ? (
              <span className="ms-10 text-sm font-medium text-gray-500 md:ms-2">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className={cn(
                  "text-sm font-medium text-gray-700 hover:text-blue-600",
                  i === 0 ? "inline-flex items-center" : "ms-1 md:ms-2"
                )}
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
