function Images({ images }: { images: string[] }) {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                5 photos
            </h1>
            <div className="flex flex-wrap">
                {images.map((img) => {
                    return (
                        <img
                            className="w-56 h-44 mr-1 mb-1"
                            src="https://resizer.otstatic.com/v2/photos/xlarge/3/41701449.jpg"
                            alt=""
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Images
