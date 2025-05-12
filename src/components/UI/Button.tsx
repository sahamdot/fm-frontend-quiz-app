import { MouseEventHandler } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-purple w-full cursor-pointer rounded-[1rem] p-3 text-[1rem] font-semibold text-neutral-100 md:rounded-[1.5rem] md:p-5 md:text-[1.5rem]"
    >
      {children}
    </button>
  );
}
