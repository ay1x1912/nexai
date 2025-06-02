import React from "react";
import Image from "next/image";

interface ErrorStateProps {
  title: string;
  description: string;
}
function EmptyState({ title, description }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <Image src={"/empty.svg"} alt="empty" width={240} height={240} />
      <div className="mx-auto flex max-w-lg flex-col gap-y-2 text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;
