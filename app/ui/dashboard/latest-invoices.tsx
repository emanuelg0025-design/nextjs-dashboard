import { fetchLatestInvoices } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        {latestInvoices.map((invoice) => (
          <div key={invoice.id} className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <img
                src={invoice.image_url}
                alt={invoice.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium">{invoice.name}</p>
                <p className="text-sm text-gray-500">{invoice.email}</p>
              </div>
            </div>

            <p className="font-semibold">{invoice.amount}</p>
          </div>
        ))}

        <div className="mt-4 flex items-center text-gray-500 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <span className="ml-1">Updated just now</span>
        </div>
      </div>
    </div>
  );
}
