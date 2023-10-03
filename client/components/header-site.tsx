"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import { OhmValueCalculatorInfo } from "./ohm-value-calculator/ohm-value-calculator-info";

export default function NavBar() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex-1">
            <span className="font-bold text-xl">Ohm Value Calculator</span>
          </div>
          <nav className="flex items-center">
            <Link
              href={"https://github.com/cesarclarosns/assessment-enroute"}
              target="_blank"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <OhmValueCalculatorInfo>
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0 hover:cursor-pointer"
                )}
              >
                <Icons.questionMarkCircledIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </OhmValueCalculatorInfo>
          </nav>
        </div>
      </div>
    </header>
  );
}
