import { useStore } from "@/store/useStore";
import { ArrowLeft, ArrowRight, HomeIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";

export const Paginationone = () => {
  const setPage = useStore((state) => state.setPage);
  const totalPage = useStore((state) => state.totalPage);
  const loading = useStore((state) => state.loading);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;

  const nextPage = () => {
    if (Number(page) >= (Number(totalPage))) return;
    setPage(Number(page) + 1)
    router.push(`?page=${Number(page) + 1}`);
  }
  const previousPage = () => {
    if (Number(page) === 1) return;
    setPage(Number(page) - 1)
    router.push(`?page=${Number(page) - 1}`);
  }
  const nextHomePage = () => {
    router.push(`?page=1`);
  }

  return (
    <div id="load-more-container" className="mt-4 flex items-center justify-center">
    <button
      onClick={nextHomePage}
      className="py-2 px-4 flex items-center gap-2 bg-[#6c5ce7]/55 rounded-full shadow-md font-medium
      text-white transition-colors duration-150 ease-in-out"
    >
      <HomeIcon />
    </button>
    <button
      disabled={loading}
      onClick={previousPage}
      className="py-2 px-4 flex items-center gap-2 bg-[#6c5ce7]/55 rounded-full shadow-md font-medium
      text-white transition-colors duration-150 ease-in-out"
    >
      <ArrowLeft />
    </button>
    <button
      disabled={loading}
      onClick={nextPage}
      className="py-2 px-4 flex items-center gap-2 bg-[#6c5ce7]/55 rounded-full shadow-md font-medium
      text-white transition-colors duration-150 ease-in-out"
    >
      <ArrowRight />
    </button>
  </div>
  )
}
