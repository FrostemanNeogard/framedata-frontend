import { BiLoaderAlt } from "react-icons/bi";

export default function Throbber() {
  return (
    <div>
      <div className="flex animate-spin w-min text-5xl">
        <BiLoaderAlt />
      </div>
    </div>
  );
}
