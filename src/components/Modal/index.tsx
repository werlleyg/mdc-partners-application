import { ReactNode, useCallback, useEffect } from "react";

import { ButtonCloseModal, Container, DivHeader } from "./styles";

// icons
import { IoClose } from "react-icons/io5";

// types
interface ModalProps {
  children: ReactNode;
  showCloseButton: boolean;
  onClose: () => void;
}

export function Modal({ children, showCloseButton, onClose }: ModalProps) {
  const handleSetCloseButton = useCallback(() => {
    onClose();
    document.body.style.overflow = "auto";
    // @ts-ignore
    document.body.scroll = "yes"; // IE
  }, [onClose]);

  useEffect(() => {
    if (document) {
      document.body.style.overflow = "hidden";
      // @ts-ignore
      document.body.scroll = "no"; // IE
    }
  }, []);

  return (
    <Container>
      {showCloseButton && (
        <DivHeader>
          <ButtonCloseModal onClick={handleSetCloseButton}>
            <IoClose />
          </ButtonCloseModal>
        </DivHeader>
      )}
      {children}
    </Container>
  );
}
