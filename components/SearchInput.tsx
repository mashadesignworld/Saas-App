"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  
useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // 1. Use the built-in URLSearchParams API
      const params = new URLSearchParams(searchParams.toString());

      // 2. Update or delete the 'topic' key
      if (searchQuery) {
        params.set("topic", searchQuery);
      } else {
        params.delete("topic");
      }

      // 3. Construct the clean URL
      // We use .toString() to get JUST the query string (e.g., "topic=kevi&subject=all")
      const queryString = params.toString();
      const updatedUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(updatedUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname, router]); // These are now safe to includeis fixed

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
      <input
        type="text"
        placeholder="Search companions..."
        className="bg-transparent border-none focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;