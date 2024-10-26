import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className=" h-screen flex items-center justify-center bg-black/5 fixed inset-0 z-[999] backdrop-blur-md">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
