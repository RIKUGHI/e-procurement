import { Alert, Button, Table } from "@/Components/atoms";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

const Dashboard = () => {
    const { auth, unapprovedVendors } = usePage<
        { unapprovedVendors: User[] } & PageProps
    >().props;

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                {auth.user.role === "ADMIN" ? (
                    <>
                        Daftar vendor yang belum disetujui
                        <Table
                            from={1}
                            columns={[
                                {
                                    label: "Nama",
                                    name: "name",
                                },
                                {
                                    label: "Email",
                                    name: "email",
                                },
                            ]}
                            rows={unapprovedVendors}
                            RenderActionCell={({ row }) => (
                                <Link
                                    href={route("approve", {
                                        user_id: row.id,
                                    })}
                                >
                                    <Button
                                        appearance="solid"
                                        className="bg-green-600"
                                    >
                                        Setujui
                                    </Button>
                                </Link>
                            )}
                        />
                    </>
                ) : auth.user.approved_at ? (
                    "Akun telah disetujui admin"
                ) : (
                    "Akun belum disetujui admin"
                )}
            </div>
        </div>
    );
};

Dashboard.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout title="Dashboard" children={page} />
);

export default Dashboard;
