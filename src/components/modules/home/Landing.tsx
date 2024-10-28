import { Input } from "@nextui-org/input";
import { SearchIcon } from "../../../assets/icons";

const Landing = () => {
  return (
    <section className="h-[calc(100vh-64px)] bg-[url('/glass.jpg')] bg-cover bg-center">
      <div className="mx-auto max-w-xl flex-1 pt-32">
        <form className="flex-1">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            placeholder="Search..."
            size="lg"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
            }
            type="text"
          />
        </form>
      </div>
    </section>
  );
};

export default Landing;
