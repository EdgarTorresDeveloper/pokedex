"use client";
import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);

  return domLoaded && <NextUIProvider>{children}</NextUIProvider>;
};
