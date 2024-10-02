import { FC } from "react";
import { Button } from "../atoms";
import Modal, { IModal } from "../atoms/Model";

interface IDeleteConfirmationModal extends IModal {
    message: string;
    importantMessages?: string[];
    loading?: boolean;
    onDelete: () => void;
}

const DeleteConfirmationModal: FC<IDeleteConfirmationModal> = ({
    show,
    message,
    importantMessages,
    loading,
    onHide,
    onDelete,
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Centered>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                                className="h-6 w-6 text-red-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                                />
                            </svg>
                        </div>
                        <div className="mt-3 flex-auto text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Peringatan
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    {message}
                                </p>
                                {importantMessages &&
                                    importantMessages.length > 0 && (
                                        <div className="border border-red-600 bg-red-100 rounded-md mt-2 py-1 px-2 text-sm">
                                            <strong>Jika iya:</strong>
                                            <ul className="list-disc ml-4 text-left">
                                                {importantMessages.map(
                                                    (message, i) => (
                                                        <li key={i}>
                                                            {message}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 space-x-2 flex justify-end sm:px-6">
                    <Button appearance="outlined" onClick={onHide}>
                        Batal
                    </Button>
                    <Button
                        appearance="solid"
                        variant="danger"
                        onClick={onDelete}
                        loading={loading}
                    >
                        Hapus
                    </Button>
                </div>
            </Modal.Centered>
        </Modal>
    );
};

export default DeleteConfirmationModal;
