import { BASE_URL } from "@/utils/constants";


export default function animeData(){
    let api={
        popular: BASE_URL + "/anime/popular",
    }

    async function getPopular(){
        const data = await fetch(api.popular);
        return data.json();
    }

    return {
        getPopular,
    }
}