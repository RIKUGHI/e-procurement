import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, PropsWithChildren } from "react";
import { FaXmark } from "react-icons/fa6";

export interface IModal {
  show: boolean;
  onHide: () => void;
}

interface ModalSubComponents {
  Header: FC<IHeader>;
  Common: FC<PropsWithChildren<IHeader>>;
  Centered: FC<PropsWithChildren>;
}

const Modal: FC<PropsWithChildren<IModal>> & ModalSubComponents = ({
  children,
  show,
  onHide,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onHide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto scrollbar">
          {children}
        </div>
      </Dialog>
    </Transition>
  );
};

interface IHeader {
  title: string;
  onHide: () => void;
}

const Header: FC<IHeader> = ({ title, onHide }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-xl font-bold text-blue-600">{title}</span>
      <button className="text-lg w-7" onClick={onHide}>
        <FaXmark className="m-auto" />
      </button>
    </div>
  );
};

const Common: FC<PropsWithChildren<IHeader>> = ({
  children,
  title,
  onHide,
}) => {
  return (
    <div className="flex justify-center items-start">
      <Transition.Child
        as={Fragment}
        enter="ease-out"
        enterFrom="opacity-0 sm:my-10"
        enterTo="opacity-100 sm:my-16"
        leave="ease-in"
        leaveFrom="opacity-100 sm:my-16"
        leaveTo="opacity-0 sm:my-10"
      >
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-full m-2 sm:w-[700px] duration-200">
          <Header title={title} onHide={onHide} />
          {children}
        </Dialog.Panel>
      </Transition.Child>
    </div>
  );
};

const Centered: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-full items-center justify-center p-4 text-center">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Dialog.Panel className="max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-xl">
          {children}
        </Dialog.Panel>
      </Transition.Child>
    </div>
  );
};

Modal.Header = Header;
Modal.Common = Common;
Modal.Centered = Centered;

export default Modal;
