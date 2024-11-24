export type Awards = {
    wins: number,
    nominations: number,
    text: string ,
}

export type IMDb = {
    rating: number,
    votes: number,
    id: number,
}

export type Tomatoes = {
    viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number,
    },
    lastUpdated: Date,
}