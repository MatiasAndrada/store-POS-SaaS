import GridDashboard from "@/components/dashboard/overview/grid-dashboard";
import { lusitana } from "@/components/fonts";
import { Suspense } from "react";
/* import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton
} from "@/components/skeletons"; */
import { Loader1 } from "@/components/loaders";

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string; } }) {
  return (
    <main className="space-y-4">
      <h1 className={`${lusitana.className} text-4xl `}>
        Dashboard
      </h1>
      <Suspense fallback={
        <Loader1 />
      }>
        <GridDashboard searchParams={searchParams} />
      </Suspense>
    </main >
  );
}
