import { Component } from "react";
import "./main.css";
import Cards from "../cards";

export default class Main extends Component {
	getMainTitle = () => {
		if (this.props.dbase && this.props.dbase.length > 0) {

			return this.props.searchStatus;
		} else {
			return "Nothing have been found";
		}
	};

	onChangeSelect = (e) => {
		this.props.setCurrentPage(e.target.selectedIndex);
		e.target.selectedIndex = null;
	};

	getPaginationLayot() {
		if (!this.props.getTotalPages || this.props.getTotalPages < 2) {

			return undefined;
		} else {
			return (
				<nav aria-label="navigation">
					<ul className="pagination justify-content-center mb-5">
						<li
							className={
								this.props.getCurrentPage() === 1
									? `page-item disabled`
									: `page-item`
							}
						>
							<button
								className="page-link main__arrow-button"
								aria-label="Previous"
								onClick={() =>
									this.props.setCurrentPage(this.props.getCurrentPage() - 1)
								}
							>
								<span aria-hidden="true">&laquo;</span>
							</button>
						</li>
						<li className="page-item main__select-wrapper">
							<select
								className="form-select main__select-pages"
								aria-label="Default select example"
								onChange={(e) => this.onChangeSelect(e)}
							>
								<option defaultValue>
									Page {this.props.getCurrentPage()} of{" "}
									{this.props.getTotalPages()}
								</option>
								{[...Array(this.props.getTotalPages())]
									.map((a, b) => b + 1)
									.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
							</select>
						</li>
						<li
							className={
								this.props.getCurrentPage() === this.props.getTotalPages()
									? `page-item disabled`
									: `page-item`
							}
						>
							<button
								className="page-link main__arrow-button"
								href="#"
								aria-label="Next"
								onClick={() =>
									this.props.setCurrentPage(this.props.getCurrentPage() + 1)
								}
							>
								<span aria-hidden="true">&raquo;</span>
							</button>
						</li>
					</ul>
				</nav>
			);
		}
	}
	changeSearchStatus() {
		this.setState({
			searchStatus: this.props.searchStatus,
		});

		return this.state.searchStatus;
	}

	render() {
		return (
			<main>
				<div className="container">
					<section className="tv-shows">
						<h3 className="tv-shows__head">{this.getMainTitle()}</h3>

						<Cards
							dbase={this.props.dbase}
							toggleModal={this.props.toggleModal}
						/>
						{this.getPaginationLayot()}
					</section>
				</div>
			</main>
		);
	}
}
