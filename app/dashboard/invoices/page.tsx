import type { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string | string[]; page?: string | string[] };
}) {
  // Normalizar query
  const queryParam = searchParams?.query;
  const query =
    typeof queryParam === 'string'
      ? queryParam
      : Array.isArray(queryParam)
      ? queryParam[0] ?? ''
      : '';

  // Normalizar page
  const pageParam = searchParams?.page;
  const pageString =
    typeof pageParam === 'string'
      ? pageParam
      : Array.isArray(pageParam)
      ? pageParam[0]
      : undefined;

  const currentPage = pageString ? Number(pageString) || 1 : 1;

  // total de páginas depende del query
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense
        key={query + currentPage}
        fallback={<InvoicesTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
