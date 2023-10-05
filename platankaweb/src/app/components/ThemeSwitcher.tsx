"use client";
import { FC, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { Switch } from "@nextui-org/react";
import { SunFilledIcon, MoonFilledIcon } from "@/app/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    onChange,
    isSelected: theme === "light" ? false : true,
  });

  return (
    <Switch
      onValueChange={onChange}
      defaultSelected={theme === "light" ? false : true}
      isSelected={theme === "light" ? false : true}
      size="sm"
      color="primary"
      startContent={<SunFilledIcon className={className} size={22} />}
      endContent={<MoonFilledIcon className={className} size={22} />}
    ></Switch>
  );
};
