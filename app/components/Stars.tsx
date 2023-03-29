import fullStart from "../../public/icons/half-star.png"
import halfStart from "../../public/icons/half-star.png"
import emptyStart from "../../public/icons/empty-star.png"
import Image from "next/image"
import { Review } from "@prisma/client"
import { calculateReviewRatingsAverage } from "../../utils/calculateReviewRatingsAverage"

function Stars({ reviews, rating }: { reviews: Review[], rating?: number }) {
    const reviewRating = rating || calculateReviewRatingsAverage(reviews)
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const difference = parseFloat((reviewRating - i).toFixed(1))
            if (difference >= 1) stars.push(fullStart)
            else if (difference < 1 && difference > 0) {
                if (difference <= 0.2) {
                    stars.push(emptyStart)
                } else if (difference > 0.2 && difference <= 0.6) {
                    stars.push(halfStart)
                } else {
                    stars.push(fullStart)
                }
            }
            else {
                stars.push(emptyStart)
            }
        }
        return stars.map((star) => {
            return (
                <Image src={star} alt="sdaf" className="w-4 h-4 mr-1" />
            )
        })
    }
    return (
        <div className="flex items-center">
            {renderStars()}
        </div >
    )
}

export default Stars
