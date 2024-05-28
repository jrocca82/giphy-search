export type GiphyResponse = {
    id: string,
    title: string,
    images: {
        original: {
            height: string,
            width: string,
        }
    }
}