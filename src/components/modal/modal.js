import "./modal.css";

const Modal = ({ toggleModal, modalData }) => {
	const { poster_path, genres, title, vote_average, overview, homepage } =
		modalData;
	let posterUrl;
	if (poster_path) {
		posterUrl =
			"https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + poster_path;
	} else {
		posterUrl = "./media/images/noposter.jpg";
	}

	const getGenres = () => {
		if (genres) {
			const genresList = genres.map((item) => {
				return <small key={item.name}>{item.name}&nbsp;</small>;
			});

			return genresList;
		}
	};

	return (
		<div className="modal hide">
			<div className="modal__content">
				<div className="card border-0" style={{ maxWidth: "540px" }}>
					<div className="row g-0">
						<div className="col-md-4 ">
							<img
								className="img-fluid rounded-start"
								src={posterUrl}
								alt={title}
							/>
						</div>

						<div className="col-md-8">
							<div
								className="card-body"
								style={{ paddingLeft: "25px", paddingTop: "0px" }}
							>
								<h3 className="card-title">{title}</h3>

								<section className="genres">
									<h5>Genres: {getGenres()}</h5>
								</section>
								<section>
									<h5>
										Raiting: <span className="rating">{vote_average}</span>
									</h5>
								</section>

								<p className="card-text mb-2">{overview}</p>

								<p className="card-text">
									{" "}
									{homepage ? (
										<a
											className="card-text modal__link"
											href={homepage ? homepage : "#"}
											target="_blanc"
										>
											<b>
												<i>{homepage}</i>
											</b>
										</a>
									) : (
										"no website for this movie"
									)}{" "}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="cross" onClick={toggleModal}>
					<span></span>
					<span></span>
				</div>
			</div>{" "}
		</div>
	);
};

export default Modal;
