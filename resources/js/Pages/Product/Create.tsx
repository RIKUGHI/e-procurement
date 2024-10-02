import { Button } from "@/Components/atoms";
import { TextInput } from "@/Components/molecules";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Create = () => {
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        price: 0,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 space-y-5">
            <strong>Tambah Produk</strong>
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

Create.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        title="Buat Produk"
        breadcrumbLinks={[
            { label: "Produk", href: route("products.index") },
            { label: "Tambah", href: "#" },
        ]}
        children={page}
    />
);

export default Create;
