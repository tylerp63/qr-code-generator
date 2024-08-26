import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="underline flex justify-center items-center h-screen">
        <Button>
          <Link href="/codes">View codes</Link>
        </Button>
      </div>
    </main>
  );
}
