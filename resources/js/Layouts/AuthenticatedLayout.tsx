import { Alert, Breadcrumbs, IBreadcrumbLink } from "@/Components/atoms";
import { Header, SideBar } from "@/Components/molecules";
import { Head } from "@inertiajs/react";
import { FC, PropsWithChildren } from "react";

const AuthenticatedLayout: FC<
    PropsWithChildren<{ title: string; breadcrumbLinks?: IBreadcrumbLink[] }>
> = ({ title, breadcrumbLinks = [], children }) => {
    return (
        <>
            <Head title={title} />
            <SideBar />
            <Header title={title} />
            <main className="ml-72 mt-5 mb-10  mx-auto px-8 space-y-5">
                <Breadcrumbs links={breadcrumbLinks} />
                <Alert />
                {children}
            </main>
        </>
    );
};

export default AuthenticatedLayout;
