export type GiphyResponse = {
    type: string,
    id: string,
    embed_url: string,
    title: string,
    images: {
        original: {
            height: string,
            width: string,
        }
    }
}