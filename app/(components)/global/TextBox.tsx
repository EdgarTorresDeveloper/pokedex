"use client";
import { Text } from "@nextui-org/react";

interface TextBox {
  text: string;
  color: "orange" | "purple" | "green" | "blue";
  key: number;
}

export const TextBox = (props: TextBox) => {
  const { text, color,key } = props;
  return (
    <div className="text-box" key={key}>
      <div className={`text-box-${color}`}>
        <Text h5>{text}</Text>
      </div>
    </div>
  );
};
