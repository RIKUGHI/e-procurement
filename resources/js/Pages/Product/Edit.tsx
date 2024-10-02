import { Button } from "@/Components/atoms";
import { SelectableOption, TextInput } from "@/Components/molecules";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Product } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";

const Edit = () => {
    const { product } = usePage<
        {
            product: Product;
        } & PageProps
    >().props;
    const { data, setData, errors, put, processing } = useForm({
        name: product.name,
        price: product.price,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("products.update", product.id));
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 space-y-5">
            <strong>Ubah Produk</strong>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-5">
                    <TextInput
                        required
                        label="Nama"
                        error={errors.name}
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <TextInput
                        required
                        label="Harga"
                        type="number"
                        error={errors.price}
                        value={data.price}
                        onChange={(e) => {
                            const price = Number(e.target.value);
                            setData("price", price < 0 ? 0 : price);
                        }}
                    />
                </div>
                <div className="mt-5 flex justify-end">
                    <Link href={route("products.index")}>
                        <Button type="button">Batal</Button>
                    </Link>
                    <Button
                        variant="primary"
                        appearance="solid"
                        loading={processing}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </div>
    );
};

Edit.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        title="Ubah Produk"
        breadcrumbLinks={[
            { label: "Produk", href: route("products.index") },
            { label: "Ubah", href: "#" },
        ]}
        children={page}
    />
);

export default Edit;
