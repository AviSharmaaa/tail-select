import { users } from "@/data";
import Select from "./components/select";

export default async function Home() {
  return await new Promise((res, _) =>
    setTimeout(
      () =>
        res(
          <main className="flex-col flex min-h-screen items-center justify-center md:p-24 p-4">
            <h1 className="mb-24 text-5xl font-bold text-[#f67403]">Pick Users</h1>
            <Select options={users} placeholder="Search..." />
          </main>
        ),
      500
    )
  );
}
