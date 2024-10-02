import { Empty, IconButton, Table } from "@/Components/atoms";
import {
    DeleteConfirmationModal,
    Pagination,
    SimpleFormSearch,
} from "@/Components/molecules";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IPaginatedData, PageProps, Product } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { FaMagnifyingGlass, FaPen, FaTrash } from "react-icons/fa6";

const Index = () => {
    const [selectedProduct, setSelectedProduct] = useState<null | Product>(
        null
    );

    const {
        auth,
        q,
        products: { meta, data },
    } = usePage<
        {
            q: string;
            products: IPaginatedData<Product>;
        } & PageProps
    >().props;

    const handleSearch = (q: string) =>
        router.get(
            route(route().current() as string),
            { ...(q && { q }) },
            {
                replace: true,
                preserveState: true,
            }
        );

    const closeModal = useCallback(() => setSelectedProduct(null), []);

    const handleDelete = () => {
        if (selectedProduct) {
            router.delete(route("products.destroy", selectedProduct.id));
            setSelectedProduct(null);
        }
    };

    return (
        <>
            <div className="bg-white shadow-sm rounded-lg p-6 space-y-5">
                <div className="flex justify-between">
                    <SimpleFormSearch
                        icon={FaMagnifyingGlass}
                        placeholder="Cari produk"
                        defaultValue={q}
                        onSearch={handleSearch}
                    />
                    {auth.user.role === "VENDOR" && (
                        <Link
                            href={route("products.create")}
                            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-md"
                        >
                            Tambah
                        </Link>
                    )}
                </div>
                {data.length === 0 ? (
                    <Empty label="produk" />
                ) : (
                    <>
                        <Table
                            from={meta.from}
                            columns={[
                                {
                                    label: "Nama",
                                    name: "name",
                                },
                                {
                                    label: "Harga",
                                    name: "price",
                                },
                            ]}
                            rows={data}
                            RenderActionCell={({ row }) =>
                                auth.user.role === "ADMIN" ? null : (
                                    <>
                                        <Link
                                            href={route(
                                                "products.edit",
                                                row.id
                                            )}
                                        >
                                            <IconButton
                                                icon={FaPen}
                                                variant="blue"
                                                title="Edit"
                                            />
                                        </Link>
                                        <IconButton
                                            icon={FaTrash}
                                            variant="red"
                                            title="Edit"
                                            onClick={() =>
                                                setSelectedProduct(row)
                                            }
                                        />
                                    </>
                                )
                            }
                        />
                        <Pagination meta={meta} />
                    </>
                )}
            </div>

            <DeleteConfirmationModal
                show={selectedProduct !== null}
                message="Apakah anda yakin akan menghapus ini?"
                onHide={closeModal}
                onDelete={handleDelete}
            />
        </>
    );
};

Index.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout title="Product" children={page} />
);

export default Index;
