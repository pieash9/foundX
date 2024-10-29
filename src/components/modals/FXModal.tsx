import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { ButtonVariantProps } from "@nextui-org/theme";

interface IProps {
  buttonText: string;
  title: string;
  children: React.ReactNode;
  buttonVariant?: ButtonVariantProps["variant"];
  // | "solid"
  // | "bordered"
  // | "light"
  // | "flat"
  // | "faded"
  // | "shadow"
  // | "ghost"
  // | undefined;
  buttonClassName?: string;
}

export default function FXModal({
  buttonText,
  title,
  children,
  buttonVariant = "light",
  buttonClassName,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={buttonClassName}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
