import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import _ from 'lodash';
import { useCallback } from 'react';
import { debounce } from 'lodash';

//pass in key value pairs to update query params
export default function useSetQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const updateQueryParams = useCallback(
    debounce((params) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      for (const [key, value] of Object.entries(params)) {
        //isEmpty reads number as empty too
        if (_.isEmpty(value) && typeof value !== 'number') {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      router.push(`${pathName}?${newSearchParams}`, { scroll: false });
    }, 500), // 300ms debounce
    [router, searchParams, pathName]
  );

  return updateQueryParams;
}
