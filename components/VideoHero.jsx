
const VideoHero = () => {

    return (
        <div className='relative w-full h-lvh overflow-hidden'>
            <video autoPlay muted loop className="w-full h-full object-cover z-0 absolute top-0 left-0">
                <source src="background.mp4" type="video/mp4" />
            </video>
        </div>
    )
}

export default VideoHero