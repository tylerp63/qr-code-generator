import Link from "next/link";
import prisma from "@/lib/db";
import React from "react";
import { updateUrl } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CodePage({ params }: { params: any }) {
  const code = await prisma.code.findUnique({
    where: {
      id: params.id,
    },
  });
  console.log(code?.id);
  const updateUrlWithId = updateUrl.bind(null, code?.id ?? "");
  return (
    <div>
      <h1>{code?.url}</h1>
      <img
        src={`http://api.qrserver.com/v1/create-qr-code/?data=${code?.url}&size=100x100`}
        alt="qrcode"
      />
      <form action={updateUrlWithId}>
        <input type="text" name="url" defaultValue={code?.url} />
        <button type="submit">Update URL</button>
      </form>

      <Link href="/codes">Back</Link>
    </div>
  );
}
