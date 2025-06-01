import { authClient } from "@/lib/authClient";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

import GeneratedAvatar from "@/components/generated-avatar";
import { ChevronDown, CreditCardIcon, LogOutIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

function DashBoardUserButton() {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();
  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };
  if (!data || isPending) {
    return null;
  }
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="border-border/10 flex w-full items-center justify-between overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
          {data.user.image ? (
            <Avatar className="siz-9">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-7"
            />
          )}

          <div className="ml-2 flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
            <p className="w-full truncate text-sm">{data.user.name}</p>
            <p className="w-full truncate text-xs">{data.user.email}</p>
          </div>
          <ChevronDown />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <div className="flex w-full justify-between">
            Billing <CreditCardIcon className="size-4" />
          </div>
          <div onClick={()=>onLogout()} className="w-full flex justify-between">
            Logout <LogOutIcon className="size-4" />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border/10 flex w-full items-center justify-between overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
        {data.user.image ? (
          <Avatar className="siz-9">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-7"
          />
        )}

        <div className="ml-2 flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm">{data.user.name}</p>
          <p className="w-full truncate text-xs">{data.user.email}</p>
        </div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="w-full text-2xl">{data.user.name}</p>
          <p className="w-full">{data.user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          Billing <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLogout()}
          className="flex justify-between"
        >
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DashBoardUserButton;
