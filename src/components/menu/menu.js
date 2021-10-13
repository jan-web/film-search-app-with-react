import "./menu.css";

const Menu = ({ onGetRatedAndNew })=> {

	const documentListener = ()=> {
		document.addEventListener('click', (e)=>{
			if(!e.target.closest('.left-menu')){
				document.querySelector('.left-menu').classList.remove('openMenu');
				document.querySelector('.hamburger').classList.remove('open');
				document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.classList.remove('active'));
			}
		})
	}

	const	onHamburgerClick = ()=> {
		document.querySelector('.left-menu').classList.toggle('openMenu');
		document.querySelector('.hamburger').classList.toggle('open');
		documentListener();
	}

	const onMenuClick = (e)=> {
		const dropdown = e.target.closest('.dropdown');
		if(dropdown) {
			dropdown.classList.toggle('active');
			document.querySelector('.left-menu').classList.add('openMenu');
			document.querySelector('.hamburger').classList.add('open');
		}
	}

	const closeMenuAndGo = (option)=> {
		document.querySelector('.left-menu').classList.remove('openMenu');
		document.querySelector('.hamburger').classList.remove('open');
		document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.classList.remove('active'));
		onGetRatedAndNew(option);
	}



		return (
			<div className="left-menu"
						onClick = { onMenuClick }>
				<div className="hamburger active"
							onClick = { onHamburgerClick }>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul className="left-menu__list">

					<li>
						<a href="#1" className="dropdown">
							<img className="menu__icon" src="./media/images/star.svg" alt="raiting" />
							<span>Ratings</span>
						</a>
						<ul className="dropdown-list">
							<li onClick={ ()=>closeMenuAndGo('top_rated')}>
								<a href="#1" id="top-rated">
									<span>Top rated movies</span>
								</a>
							</li>
							<li onClick={ ()=>closeMenuAndGo('popular')}>
								<a href="#1" id="popular">
									<span>Popular</span>
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#1" className="dropdown">
							<img className="menu__icon" src="./media/images/laptop.svg" alt="raiting" />
							<span>New and Upcoming</span>
						</a>
						<ul className="dropdown-list">
							<li onClick={ ()=>closeMenuAndGo('upcoming')}>
								<a href="#1" id="upcoming">
									<span>Upcoming movies in theatres</span>
								</a>
							</li>
							<li onClick={ ()=>closeMenuAndGo('now_playing')}>
							<a href="#1" id="now">
									<span>Now playing in theatres</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
};

export default Menu;
