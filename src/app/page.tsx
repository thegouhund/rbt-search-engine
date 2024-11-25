import { Suspense } from "react";
import GoogleText from "./components/GoogleText";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-white">
      <div className="w-full">
        <div>
          <header className="mb-8 text-center">
            <GoogleText size="lg" />
          </header>

          <main className="flex w-full flex-col items-center">
            <Suspense>
              <SearchBar />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
