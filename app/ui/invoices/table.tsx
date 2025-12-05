import Image from 'next/image';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { InvoicesTable } from '@/app/lib/definitions';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import Status from '@/app/ui/invoices/status';

type InvoicesTableProps = {
  query: string;
  currentPage: number;
};

export default async function Table({
  query,
  currentPage,
}: InvoicesTableProps) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-0 text-right text-sm font-semibold text-gray-900"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {invoices?.map((invoice: InvoicesTable) => (
                <tr key={invoice.id} className="group">
                  {/* Customer + avatar */}
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={invoice.image_url}
                          alt={invoice.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {invoice.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {invoice.email}
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatCurrency(invoice.amount)}
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDateToLocal(invoice.date)}
                  </td>

                  {/* Status pill */}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Status status={invoice.status} />
                  </td>

                  {/* Actions: Edit + Delete */}
                  <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
