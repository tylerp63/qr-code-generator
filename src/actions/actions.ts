"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUrl(formData: FormData) {
  await prisma.code.create({
    data: {
      url: formData.get("url") as string,
    },
  });
  revalidatePath("/codes");
}

export async function updateUrl(id: string, formData: FormData) {
  await prisma.code.update({
    where: { id },
    data: {
      url: formData.get("url") as string,
    },
  });
  revalidatePath("/codes");
}

export async function deleteUrl(id: string) {
  await prisma.code.delete({ where: { id } });
}
