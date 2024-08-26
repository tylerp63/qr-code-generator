import Link from "next/link";
import prisma from "@/lib/db";
import React from "react";
import { updateUrl } from "@/actions/actions";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function CodePage({ params }: { params: any }) {
  const code = await prisma.code.findUnique({
    where: {
      id: params.id,
    },
  });
  console.log(code?.id);
  const updateUrlWithId = updateUrl.bind(null, code?.id ?? "");
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <h1 className="underline text-blue-400 pb-8">{code?.url}</h1>
        <Card className="w-80 h-80 flex items-center justify-center mx-auto mb-8">
          <img
            src={`http://api.qrserver.com/v1/create-qr-code/?data=${code?.url}&size=200x200`}
            alt="qrcode"
            className=""
          />
        </Card>
        <div className="flex items-center justify-center">
          <form action={updateUrlWithId}>
            <Input
              type="text"
              name="url"
              placeholder="URL"
              className="mb-8 w-80"
            />
            <Button className="flex mx-auto w-30 mb-8">Update URL</Button>
          </form>
        </div>

        <Link href="/codes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="gray"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
