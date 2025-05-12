import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useApp } from "../hooks/useApp";
import { useQuiz } from "../hooks/useCart";
import CategoryTitleIcon from "./Category/CategoryTitleIcon";

export default function Header() {
  const { darkMode, toggleDarkMode } = useApp();
  const { current } = useQuiz();

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <header
      className={clsx({
        "container mx-auto mb-4 flex h-[6rem] items-center md:mb-0 md:h-[15rem]":
          true,
        "justify-between": current?.category,
        "justify-end": !current?.category,
      })}
    >
      {current?.category && <CategoryTitleIcon />}

      <div className="flex items-center gap-4">
        <Icon
          className="text-xl text-neutral-400 dark:text-neutral-100"
          icon="heroicons:sun"
        />
        <div
          onClick={handleToggleDarkMode}
          className={clsx({
            "bg-purple flex w-[3rem] cursor-pointer items-center rounded-full p-1":
              true,
            "justify-end": darkMode,
            "justify-start": !darkMode,
          })}
        >
          <div className="size-5 rounded-full bg-neutral-100">&nbsp;</div>
        </div>
        <Icon
          className="text-xl text-neutral-400 dark:text-neutral-100"
          icon="heroicons:moon"
        />
      </div>
    </header>
  );
}
