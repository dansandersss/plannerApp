"use client";

import { searchPosts } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useParams } from "next/navigation";
import LoaderForPages from "../Loader/LoaderForPages";
import { useSidebar } from "../Sidebar/SidebarContext";

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResults, setHasResults] = useState(false);
  const router = useRouter();
  const { query } = useParams();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (query) {
          const posts = await searchPosts(query);
          if (posts.length > 0) {
            setSearchResults(posts);
            setHasResults(true);
          } else {
            setHasResults(false);
          }
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      {isLoading ? (
        <LoaderForPages loadingTime={5} />
      ) : (
        <section
          className={`mt-16 transition-all duration-200 ease-in-out ml-14 pb-4 ${
            isSidebarOpen
              ? "translate-x-10 md:translate-x-4"
              : "-translate-x-14 md:-translate-x-24"
          }`}
        >
          <h1 className="text-black text-4xl font-bold mb-4">Search Results</h1>

          <div className="flex flex-col gap-4">
            {hasResults ? (
              searchResults.map((task) => (
                <TaskCard key={task.$id} task={task} />
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default SearchPage;
