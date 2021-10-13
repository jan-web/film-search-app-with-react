export default class DBService {
	API_KEY = "93893642d4fb10181dd30bc34cb00565";
	API_SERVER = "https://api.themoviedb.org/3";

	getData = async (url) => {
		const res = await fetch(url);
		if (res.ok) {
      
			return res.json();
		} else {
			throw Error(`Have not received data from ${url}`);
		}
	};

	showHideSpinner = (swichMark) => {
		const tvShowList = document.querySelector(".tv-shows");
		const loading = document.querySelector(".loading");

		if (tvShowList) {
			switch (swichMark) {
				case "show":
					tvShowList.style.display = "none";
					loading.style.display = "block";
					break;
				case "hide":
					tvShowList.style.display = "block";
					loading.style.display = "none";
					break;

				default:
					break;
			}
		}
	};

	getSearchResult = async (query, current_page = 1) => {
		this.showHideSpinner("show");
		const result = await this.getData(
			`${this.API_SERVER}/search/movie?api_key=${this.API_KEY}&query=${query}&language=en-US&page=${current_page}&include_adult=false`
		);
		this.showHideSpinner("hide");

		return result;
	};

	getRatedAndNew = async (quest, current_page) => {
		this.showHideSpinner("show");
		const result = await this.getData(
			`${this.API_SERVER}/movie/${quest}?api_key=${this.API_KEY}&language=en-US&page=${current_page}`
		);
		this.showHideSpinner("hide");

		return result;
	};

	getFilmInfo = async (id) => {
		const preloader = document.querySelector(".preloader");
		preloader.style.display = "flex";
		const result = await this.getData(
			`${this.API_SERVER}/movie/${id}?api_key=${this.API_KEY}&language=en-US`
		);
		preloader.style.display = "none";

		return result;
	};
}
