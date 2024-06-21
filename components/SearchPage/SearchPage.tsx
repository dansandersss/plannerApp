"use client";

import { searchPosts } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useParams, useSearchParams } from "next/navigation";

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { query } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (query) {
          const posts = await searchPosts(query);
          setSearchResults(posts);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  console.log(query);

  return (
    <>
      <section className="mt-16 ml-14 pb-4">
        <h1 className="text-black text-4xl font-bold mb-4">Search Results</h1>

        <div className="flex flex-col gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((task) => <TaskCard key={task.$id} task={task} />)
          ) : (
            <p>No results found</p>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchPage;
