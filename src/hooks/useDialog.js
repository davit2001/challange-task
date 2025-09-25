import { useState } from "react";

const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    return {
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
    };
};

export default useDialog;
