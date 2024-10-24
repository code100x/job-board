import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Download, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { PaymentType } from '@/types/payment.types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

const PaymentManagement = ({ payments }: { payments: PaymentType[] }) => {
  return (
    <div className="min-h-screen w-4/5 mx-auto p-8 text-gray-900  dark:text-gray-100 ">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      </div>
      <div className="flex justify-between mb-6">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400" />
          <Input
            className="pl-10 border-gray-300 text-gray-900 placeholder-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-white"
            placeholder="Search payments....."
          />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px] bg-gray-200 border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Latest Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Payment</SelectItem>
              <SelectItem value="oldest">Oldest Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="rounded-md border overflow-hidden dark:border-gray-700">
        <Table>
          <TableHeader className="bg-gray-200 border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <TableRow>
              <TableHead className="px-2 py-4">Transaction ID</TableHead>
              <TableHead className="px-2 py-4">Company Name</TableHead>
              <TableHead className="px-2 py-4">Amount</TableHead>
              <TableHead className="px-2 py-4">Payment Date</TableHead>
              <TableHead className="px-2 py-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length ? (
              payments.map((payment) => (
                <TableRow key={payment.tranId}>
                  <TableCell className="px-2 py-4">{payment.tranId}</TableCell>
                  <TableCell className="px-2 py-4">
                    {payment.companyName}
                  </TableCell>
                  <TableCell className="px-2 py-4 text-green-600 dark:text-green-400">
                    ${payment.amount}
                  </TableCell>
                  <TableCell className="px-2 py-4">{payment.date}</TableCell>
                  <TableCell className="px-2 py-4">
                    <Download className="text-blue-600 hover:text-blue-800 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No Payment History
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-start">
        <div className="">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                  isActive
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  9
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  10
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
