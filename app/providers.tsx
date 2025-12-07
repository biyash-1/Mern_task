"use client"
import { QueryClient,QueryClientProvider,useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function Providers({children}:{children:React.ReactNode}) {

    const queryClient = new QueryClient();
    return(
        <QueryClientProvider client={queryClient}>
            {children}
              <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
    )
}

