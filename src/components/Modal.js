import Image from "next/image";
import {MdOutlineClose} from "react-icons/md";
import {motion} from "framer-motion";
import Backdrop from "./Backdrop";
import styles from "../styles/Modal.module.css";
import useWindowSize from "../hooks/useWindowSize";

const slideUp = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 40,
      stiffness: 400,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const backdropURL = "https://image.tmdb.org/t/p/w500";

const Modal = ({handleClose, type, video, gallery}) => {
  // Variables
  const {width} = useWindowSize();

  // Function
  const dragControls = (e, info) => {
    if (info.point.y > 2000 || info.velocity.y > 200) handleClose();
  };

  // Render
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={slideUp}
        animate="visible"
        initial="hidden"
        exit="exit"
      >
        <motion.div
          drag={width <= 600 ? "y" : ""}
          dragConstraints={{top: 0, bottom: 300}}
          onDragEnd={width <= 600 ? dragControls : null}
          className={
            type === "trailer" ? styles.trailerContent : styles.modalContent
          }
        >
          <div className={styles.modalHeader}>
            <p>{type === "trailer" ? "Trailer" : "Gallery"}</p>
            <button onClick={handleClose} className={styles.modalBtn}>
              <MdOutlineClose size={24} />
            </button>
          </div>
          {type === "trailer" ? (
            <iframe
              allowFullScreen
              className={styles.trailer}
              title="YouTube video player"
              src={`https://www.youtube.com/embed/${
                video.length && video[0].key
              }`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className={styles.gallery}>
              {gallery &&
                gallery.map((item) => (
                  <Image
                    width={300}
                    height={250}
                    loading="lazy"
                    key={item.file_path}
                    alt="Backdrop Image"
                    className={styles.galleryImg}
                    src={backdropURL + item.file_path}
                  />
                ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
