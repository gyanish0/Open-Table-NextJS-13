import { Review } from "@prisma/client";

export const calculateReviewRatingsAverage = (reviews: Review[]) => {
    if (!reviews.length) return 0
    return reviews.reduce((sum, reviews) => {
        return sum + reviews.rating
    }, 0) / reviews.length
}