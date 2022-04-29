
export async function get() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    const res = await fetch(url)
    const coinsList = await res.json()


    if (coinsList) {
        return {
            body: { coinsList }
        };
    }

    return {
        status: 404
    };
}

