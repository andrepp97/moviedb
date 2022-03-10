import { useState, useEffect } from 'react'
import { MovieCard, MovieGenre, MovieSlider } from '../components'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/Home.module.css'

const Home = () => {
    // State
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [popular, setPopular] = useState([])
    const [filtered, setFiltered] = useState([])
    const [activeGenre, setActiveGenre] = useState(0)

    // Function
    const getPopularMovies = async () => {
        const result = await fetch(process.env.NEXT_PUBLIC_URL + `/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`)
        const movies = await result.json()
        setPopular(movies.results)
        setFiltered(movies.results)
    }

    const getUpcomingMovies = async () => {
        const result = await fetch(process.env.NEXT_PUBLIC_URL + `/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`)
        const movies = await result.json()
        setTimeout(() => {
            setUpcoming(movies.results)
        }, 250)
    }

    const getTopMovies = async () => {
        const result = await fetch(process.env.NEXT_PUBLIC_URL + `/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`)
        const movies = await result.json()
        setTimeout(() => {
            setTopRated(movies.results)
        }, 250)
    }

    // Lifecycle
    useEffect(() => {
        getUpcomingMovies()
        getTopMovies()
        getPopularMovies()
    }, [])

    // Render
    return (
        <div>
            <div className="main">
                <p className="main-text">
                    Welcome to MovieDB
                    <br />
                    <small className="secondary-text">
                        Movie database for your needs, explore now.
                    </small>
                </p>
            </div>

            <MovieSlider
                movies={upcoming}
                title="Upcoming Movies"
            />

            <MovieSlider
                movies={topRated}
                title="Top Rated Movies"
            />

            <MovieGenre
                title="Genres"
                popular={popular}
                setFiltered={setFiltered}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
            />

            <motion.div className={styles.popular}>
                <AnimatePresence>
                    {filtered.map(movie => (
                        <MovieCard
                            key={movie.id}
                            data={movie}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default Home;