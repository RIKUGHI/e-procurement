import { PageProps } from "@/types";
import { cn } from "@/utils/common";
import { usePage } from "@inertiajs/react";
import { cva } from "class-variance-authority";
import { FC, useState } from "react";
import { FaCheck, FaTriangleExclamation, FaXmark } from "react-icons/fa6";

const alertVariants = cva(
    "px-4 flex items-center justify-between gap-2 rounded",
    {
        variants: {
            variant: {
                success: "bg-green-500 text-white",
                error: "bg-red-500 text-white",
            },
        },
        defaultVariants: {
            variant: "success",
        },
    }
);

interface IAlert {}

const Alert: FC<IAlert> = () => {
    const [visible, setVisible] = useState(true);
    const { flash } = usePage<PageProps>().props;

    const handleClose = () => setVisible(false);

    if (!flash || !visible) return null;

    return (
        <div className={cn(alertVariants({ variant: flash.status }))}>
            <div>
                {flash.status === "success" ? (
                    <FaCheck />
                ) : (
                    <FaTriangleExclamation />
                )}
            </div>
            <div className="py-4 text-sm font-medium flex-1">
                {flash.message}
            </div>
            <button className="focus:outline-none" onClick={handleClose}>
                <FaXmark />
            </button>
        </div>
    );
};

export default Alert;
