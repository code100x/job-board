import React from 'react';

interface TableDetails {
  heading: string;
  placeholder: string;
  toggle: string[][];
  tableHeading: string[];
  tableData: (string | JSX.Element | undefined)[][];
}
interface AdminCardProps {
  tabledetails: TableDetails;
}

function AdminCard({ tabledetails }: AdminCardProps) {
  return (
    <div className="space-y-4 px-6 max-w-6xl mx-auto w-full">
      <div className="py-2">
        <h1 className="text-2xl font-semibold">{tabledetails.heading}</h1>
      </div>
      <div className="flex justify-between">
        <div className="w-2/6">
          <SearchBox placeholder={tabledetails.placeholder} />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div>
            <SelectBox label={tabledetails.toggle} />
          </div>
        </div>
      </div>
      <div className="">
        <Table
          tableheading={tabledetails.tableHeading}
          tabledata={tabledetails.tableData}
        />
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default AdminCard;

const SearchBox = ({ placeholder }: { placeholder: string }) => {
  return (
    <form className="flex items-center w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
          <svg
            className="w-3 h-3 text-gray-600 dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full px-4 py-1 ps-6 text-sm text-gray-900 border border-gray-300 rounded outline-none bg-gray-50 placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </form>
  );
};

const SelectBox = ({ label }: { label: string[][] }) => {
  return (
    <form className="max-w-lg flex gap-4">
      {label.map((option, index) => {
        return (
          <select
            key={index}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-[#020817] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {option.map((item, index) => {
              return (
                <option key={index} value="US">
                  {item}
                </option>
              );
            })}
          </select>
        );
      })}
    </form>
  );
};

const Table = ({
  tableheading,
  tabledata,
}: {
  tableheading: string[];
  tabledata: (string | JSX.Element | undefined)[][];
}) => {
  return (
    <div className="relative overflow-x-auto rounded border">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 border-b bg-[#F1F5F9] dark:bg-[#0F172A] dark:text-gray-200">
          <tr>
            {tableheading.map((heading: string, index: number) => {
              return (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 ${index > 2 ? 'hidden lg:table-cell' : ''}`}
                >
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tabledata.map((row, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-transparent dark:border-gray-700"
              >
                {row.map((item, index) => {
                  return (
                    <th
                      key={index}
                      className={`px-6 py-3 font-normal ${index > 2 ? 'hidden lg:table-cell' : ''}`}
                    >
                      {item}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = () => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base gap-2">
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#020817] rounded dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#16213b] dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2 h-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 text-sm bg-gray-100 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0F172A] rounded dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#16213b] dark:hover:text-white"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 text-sm bg-gray-100 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0F172A] rounded dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#16213b] dark:hover:text-white"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 rounded border border-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-[#16213b] dark:text-white"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 text-sm bg-gray-100 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0F172A] rounded dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#16213b] dark:hover:text-white"
          >
            4
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 text-sm bg-gray-100 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0F172A] rounded dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#16213b] dark:hover:text-white"
          >
            5
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 text-sm bg-gray-100 border-gray-300 border hover:bg-gray-100 hover:text-gray-700 dark:bg-[#020817] rounded dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#16213b] dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2 h-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};
