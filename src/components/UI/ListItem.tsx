import { Icon } from "@iconify/react";
import { cn } from "../../utils/cn";

export default function ListItem({
  icon,
  children,
  text,
  onClick,
  className,
  disabled = false,
}: {
  icon: {
    name: string | number;
    color: {
      background: string;
      foreground: string;
    };
  };
  children?: React.ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <li className="w-full">
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "shadow-std flex w-full cursor-pointer items-center gap-4 rounded-[1rem] border-2 border-transparent bg-neutral-100 p-3 text-left md:rounded-[1.5rem] md:p-5 dark:bg-neutral-400",
          className || "",
        )}
      >
        <div
          className={`flex h-[3rem] shrink-0 basis-[3rem] items-center justify-center rounded-lg md:h-[3.5rem] md:basis-[3.5rem] ${icon.color.background}`}
        >
          {typeof icon.name === "string" && (
            <Icon
              icon={icon.name}
              className={`text-3xl ${icon.color.foreground}`}
            />
          )}

          {typeof icon.name === "number" && (
            <p
              className={`text-[1rem] font-semibold md:text-[2rem] ${icon.color.foreground}`}
            >
              {"ABCD".charAt(icon.name)}
            </p>
          )}
        </div>

        <p className="text-[1rem] font-semibold md:text-[2rem] dark:text-neutral-100">
          {text}
        </p>
        {children}
      </button>
    </li>
  );
}
