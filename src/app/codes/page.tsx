import Link from "next/link";
import prisma from "@/lib/db";
import React from "react";
import { createUrl } from "@/actions/actions";

export default async function CodesPage() {
  const codes = await prisma.code.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <h1>All Codes ({codes.length})</h1>
      <ul>
        {codes.map((code) => (
          <li key={code.id} className="flex items-center justify-between px-5">
            <Link href={`/codes/${code.id}`}>{code.url}</Link>
          </li>
        ))}
      </ul>
      <form action={createUrl}>
        <input type="text" name="url" placeholder="URL" />
        <button type="submit" className=" bg-blue-600">
          Create QR code
        </button>
      </form>
    </div>
  );
}
