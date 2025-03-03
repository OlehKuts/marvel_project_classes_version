const  getResource = async (url) => {
    let result = await fetch(url);
    if (!result.ok) {
        throw new Error (`Couldn't fetch ${url}, status - ${result.status}`)
    }
    return await result.json()
}