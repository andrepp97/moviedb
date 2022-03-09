import { useState, useEffect } from 'react'
import { MovieCard, MovieGenre, MovieSlider } from '../components'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/Home.module.css'

const key = 'bc74ac3c2a2bd30c08c381cd0ca4a878'
const url = `https://api.themoviedb.org/3/movie`

const Home = () => {
    // State
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [popular, setPopular] = useState([])
    const [filtered, setFiltered] = useState([])
    const [activeGenre, setActiveGenre] = useState(0)

    // Function
    const getPopularMovies = async () => {
        const result = await fetch(url + `/popular?api_key=${key}&language=en-US&page=1`)
        const movies = await result.json()
        setPopular(movies.results)
        setFiltered(movies.results)
        console.log(movies.results)
    }

    const getUpcomingMovies = async () => {
        const result = await fetch(url + `/upcoming?api_key=${key}&language=en-US&page=1`)
        const movies = await result.json()
        setTimeout(() => {
            setUpcoming(movies.results)
        }, 500)
    }

    const getTopMovies = async () => {
        const result = await fetch(url + `/top_rated?api_key=${key}&language=en-US&page=1`)
        const movies = await result.json()
        setTimeout(() => {
            setTopRated(movies.results)
        }, 500)
    }

    // Lifecycle
    useEffect(() => {
        getUpcomingMovies()
        getTopMovies()
        getPopularMovies()
    }, [])

    // Render
    return (
        <div className={styles.container}>
            <div className="main">
                <p className="main-text">
                    Welcome to MovieDB
                    <p className="secondary-text">
                        Movie database for your needs, explore now.
                    </p>
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