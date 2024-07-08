"use client";

import { searchPosts } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useParams } from "next/navigation";
import LoaderForPages from "../Loader/LoaderForPages";
import { useSidebar } from "../Sidebar/SidebarContext";

interface Task {
  $id: string;
  title: string;
  desc: string;
  priority: string;
  status: string;
  tags: string[];
  [key: string]: any;
}

function SearchPage() {
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResults, setHasResults] = useState(false);
  const { query } = useParams();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (query) {
          const posts = await searchPosts(query);
          setSearchResults(posts);
          setHasResults(posts.length > 0);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
        setHasResults(false);
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
          className={`mt-16 w-1/2 sm:w-2/3 transition-all duration-200 ease-in-out ml-14 pb-4 ${
            isSidebarOpen ? "sm:translate-x-10" : "translate-x-8"
          }`}
        >
          <h1 className="text-black text-4xl font-bold mb-4">Search Results</h1>

          <div className="flex flex-col gap-4">
            {hasResults ? (
              searchResults.map((task) => (
                <TaskCard key={task.$id} task={task} />
              ))
            ) : (
              <p>{`No results found for "${query}"`}</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default SearchPage;
