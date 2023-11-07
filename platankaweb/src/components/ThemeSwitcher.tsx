"use client";
import { FC, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { BsSunFill } from "react-icons/bs";
import { Switch } from "@nextui-org/react";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <>
        <div className="w-7 h-7 rounded-md  flex items-center justify-center  hover:bg-default-100 duration-100">
          <MoonFilledIcon />
        </div>
      </>
    );
  const currentTheme = theme == "light" ? "dark" : "light";
  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className="w-7 h-7 rounded-md  flex items-center justify-center  duration-100 hover:cursor-pointer"
      onClick={onChange}
    >
      {currentTheme === "light" ? <BsSunFill /> : <MoonFilledIcon />}
    </div>
  );
};
