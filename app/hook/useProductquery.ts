import {useQuery} from "@tanstack/react-query"


export const useProducts = () =>{
 return useQuery({
    queryKey:["products"],
    queryFn:async() =>{
        const res =await fetch("https://fakestoreapi.com/products")
        if (!res.ok) throw new Error("failed to fetch  products");
        return res.json();

    },
    staleTime:1000*15
 })
}