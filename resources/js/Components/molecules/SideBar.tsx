import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { FaBox, FaDesktop } from "react-icons/fa6";
import { Menu } from "../atoms";

const SideBar = () => {
    const { auth } = usePage<PageProps>().props;

    return (
        <aside className="fixed top-0 left-0 bottom-0 flex w-72 flex-col shadow-sm">
            <div className="flex flex-grow flex-col gap-5 overflow-y-auto bg-white px-6">
                <div className="flex h-10 flex-shrink-0 items-center mt-3">
                    {/* <img
                        className="h-full w-full object-cover"
                        src={"#"}
                        alt="Your Company"
                    /> */}
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul className="-mx-2">
                        <Menu
                            icon={FaDesktop}
                            label="Dashboard"
                            hrefs="dashboard"
                        />
                        {(auth.user.role === "ADMIN" ||
                            (auth.user.role === "VENDOR" &&
                                auth.user.approved_at)) && (
                            <Menu
                                icon={FaBox}
                                label="Produk"
                                hrefs="products.index"
                            />
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;
