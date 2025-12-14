import { use } from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";

import StockChart from "./StockChart";

export default function Page({ params }) {
  const { id } = use(params); // ✅ REQUIRED in Next.js 16

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <main className="container mx-auto px-4">
        <Breadcrumb stock={id} />
        
        <StockChart stock={id} />
      </main>
    </div>
  );
}
