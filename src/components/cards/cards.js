import "./cards.css";

const Cards = ({ dbase, toggleModal }) => {
	if (dbase) {
		const changeImage = (e) => {
			const img = e.target.closest(".card-img-top");
			if (img) {
				if (img.dataset.backdrop) {
					[img.dataset.backdrop, img.src] = [img.src, img.dataset.backdrop];
				}
			}
		};

		const allCards = dbase.map((elem) => {
			const imgSrc = elem.poster_path
      ? "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + elem.poster_path
      : "./media/images/noposter.jpg";
			const posterUrl = elem.poster_path
				? imgSrc
				: "./media/images/noposter.jpg";
			const backdropSrc = elem.backdrop_path
				? "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" +
				  elem.backdrop_path
				: posterUrl;

			return (
				<li className="tv-shows__item mb-3" key={elem.id}>
					<a href="#1" className="tv-card" onClick={() => toggleModal(elem.id)}>
						<div className="card" style={{ width: "13rem" }}>
							<img
								className="card-img-top"
								src={imgSrc}
								data-backdrop={backdropSrc}
								alt={elem.original_title}
								onMouseOver={changeImage}
								onMouseLeave={changeImage}
							/>

							<div className="card-body">
								<h6 className="card-title m-0">
									{elem.title.length > 18
										? elem.title.substring(0, 18) + "..."
										: elem.title}
								</h6>
							</div>
						</div>
						{elem.vote_average ? (
							<span className="tv-card__vote">{elem.vote_average}</span>
						) : (
							""
						)}
					</a>
				</li>
			);
		});

		return <ul className="tv-shows__list">{allCards}</ul>;
	}
	return true;
};

export default Cards;
