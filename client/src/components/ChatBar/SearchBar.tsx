import {userProps} from "@/types";
import {SearchIcon} from "@/utils/icons";
import Image from "next/image";
import React from "react";

function SearchBar({
  user,
  onFilterChange,
}: {
  user: userProps;
  onFilterChange?: (filter: string) => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="avatar online">
        {user?.imageId && user.imageId.length > 0 && (
          <div className="w-12 rounded-full ring">
            <Image
              src={`https://robohash.org/${user.imageId}.png`}
              width={256}
              height={256}
              alt="avatar"
            />
          </div>
        )}
      </div>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="input pl-12 rounded-full input-bordered w-full bg-gray-100 placeholder:text-gray-500"
          onChange={(e) => {
            onFilterChange && onFilterChange(e.target.value);
          }}
        />
        <button className="w-6 h-6 absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
