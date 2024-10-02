import { Pagination, SimpleFormSearch } from "@/Components/molecules";
import { IPaginatedData, PageProps, Product } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Welcome({
    q,
    products: { data, meta },
}: PageProps<{ q: string; products: IPaginatedData<Product> }>) {
    const handleSearch = (q: string) =>
        router.get(
            route(route().current() as string),
            { ...(q && { q }) },
            {
                replace: true,
                preserveState: true,
            }
        );
    return (
        <>
            <Head title="Welcome" />
            <header className="bg-white">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex lg:flex-1 lg:justify-end space-x-4">
                        <Link
                            href={route("login")}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Log in Vendor
                        </Link>
                        <Link
                            href={route("register")}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Register Vendor
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="p-5 space-y-2">
                <div>
                    <SimpleFormSearch
                        icon={FaMagnifyingGlass}
                        placeholder="Cari produk"
                        onSearch={handleSearch}
                    />
                </div>
                <div className="bb grid grid-cols-4 gap-5">
                    {data.map((d, i) => (
                        <div
                            key={i}
                            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
                        >
                            <img
                                className="w-full h-48 object-cover"
                                src="https://via.placeholder.com/300"
                                alt="Product Image"
                            />
                            <div className="p-5">
                                <h2 className="font-bold text-xl mb-2">
                                    {d.name}
                                </h2>
                                <p className="text-gray-700 text-base">
                                    This is a brief description of the product.
                                    It highlights its features and benefits.
                                </p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-bold text-blue-600">
                                        {d.price}
                                    </span>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination meta={meta} />
            </main>
        </>
    );
}
