import { useState } from "react";
import { useTranslation } from "react-i18next";
import movieTileStyles from "./movieTile.module.scss";

export function MovieTile(movie: Movie) {
    const { t } = useTranslation();
    const [isShowModal, setIsShowModal] = useState(false);
    let localIsShowModal = false

    const changeModal = () => {
        setIsShowModal(prev => {
            localIsShowModal = !prev;
            return !prev;
        })
    }

    return (
        <div className={movieTileStyles.movieTile} onClick={() => {changeModal()}}>
            <p className={movieTileStyles.title}>{movie.title}</p>
            <img className={movieTileStyles.image} src={movie.image} alt="" />
            <div id="overlay" style={{display: isShowModal ? '' : 'none'}}>
                <div id="content">
                    {movie.description &&
                        <p>{movie.description}</p>
                    }
                    {!movie.description &&
                        <p>{t('NoDescription')}</p>
                    }
                </div>
            </div>
        </div>
    );
}

export interface Movie {
    title: string;
    description: string;
    image: string;
}