import { users } from "@/data";
import Image from "next/image";
import Select from "./components/select";

export default async function Home() {
  return await new Promise((res, _) =>
    setTimeout(
      () =>
        res(
          <main className="flex min-h-screen items-center justify-center md:p-24 p-4">
            <Select options={users} placeholder="Search..." />
          </main>
        ),
      500
    )
  );
}
