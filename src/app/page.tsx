import GoogleText from "./components/GoogleText";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center">
      <div className="w-full">
        <header className="text-center mb-4">
          <GoogleText />
        </header>

        <main className="w-full flex flex-col items-center">
          <SearchBar />
        </main>
      </div>
    </div>
  );
}
