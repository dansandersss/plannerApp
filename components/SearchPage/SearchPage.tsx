"use client";

import { searchPosts } from "@/lib/appwrite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useSearchParams } from "next/navigation";

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (q) {
          const posts = await searchPosts(q);
          setSearchResults(posts);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <>
      <section className="mt-16 ml-14 pb-4">
        <h1 className="text-black text-4xl font-bold mb-4">Search Results</h1>

        <div className="flex flex-col gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((task) => (
              <TaskCard
                key={task.$id}
                task={task}
                // Здесь можно передать любые другие props, которые нужны для TaskCard
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchPage;
