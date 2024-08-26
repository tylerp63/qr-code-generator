import Link from "next/link";
import prisma from "@/lib/db";
import React from "react";
import { createUrl } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function CodesPage() {
  const codes = await prisma.code.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="flex-col gap-8 p-8">
        <div className="flex mx-auto text-center  pb-8">
          <h1 className="text-5xl font-semibold justify-center text-center">
            All Codes ({codes.length})
          </h1>
        </div>
        <ul className="pb-8">
          {codes.map((code) => (
            <li
              key={code.id}
              className="flex items-center justify-between px-5 pb-1"
            >
              <Link
                href={`/codes/${code.id}`}
                className="underline text-blue-500"
              >
                {code?.url}
              </Link>
            </li>
          ))}
        </ul>
        <form action={createUrl}>
          <Input type="text" name="url" placeholder="URL" className="mb-8" />
          <Button>Create QR code</Button>
        </form>
      </Card>
    </div>
  );
}
