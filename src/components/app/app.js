import { Component } from 'react';
import './app.css';
import './style.css';
import '../../services/db-service';

import Menu from '../menu';
import Main from '../main';
import Modal from '../modal';
import Header from '../header';
import DBService from '../../services/db-service';





export default class App extends Component {

    dbService = new DBService();

    state = {
        dbase: null,
        modalData: {},
        term: '',
        searchStatus: 'Search results',
        total_pages: 0,
        current_page: 1
    }

    constructor() {
      super();
      this.updateBase();
      this.documentListener();
    }
    updateBase(term, page) {

      if(!this.state.dbase || !term){
        this.onGetRatedAndNew('upcoming');
          } else {
            this.dbService
            .getSearchResult(term, page)
            .then((data)=>{
              this.hideOldCards();

              return data;
            })
            .then((data)=> {
              this.setState({
                dbase: data.results,
                total_pages: data.total_pages
              })
            })
            .then(()=>{
              this.showOldCards();
            })
    }
}

    getRatedAndNew(quest, page) {
      const mark = page;
      if(!page) {
        page = 1;
      }

      this.dbService
      .getRatedAndNew(quest, page)
      .then((data)=>{
        if(!mark){
        this.setState ({
          current_page: 1
        })
        }

        this.setState({
          total_pages: data.total_pages
        })
        this.hideOldCards();
        let status = '';
         switch (quest){
         case 'top_rated':
           status = 'Top rated movies';
          break;
          case 'popular':
            status = 'Popular';
           break;
           case 'upcoming':
            status = 'Upcoming movies in theatres';
           break;
           case 'now_playing':
            status = 'Now playing in theatres';
           break;
           default:
            break;
        }
        this.setState({
            searchStatus: status
        })

        return data;
      })
      .then((data)=> {
        this.setState({
          dbase: data.results
        })
      })
      .then(()=>{
        this.showOldCards();
      })
    }

    getFilmInfo(id) {
        this.dbService
        .getFilmInfo(id)
        .then((data)=> {
          this.setState({
            modalData: data
          })
        })
        .then(()=>{
          this.hideAndShowModal();
        })
}

    toggleModal = async (modalData)=>{
      if(modalData.type !== "click"){
        await this.getFilmInfo(modalData);
      } else {
        this.hideAndShowModal();
      }

    }
    hideAndShowModal = ()=> {
      if(document.querySelector('.modal').classList.contains('hide')){
        document.querySelector('.modal').classList.remove('hide');
        document.body.style.overflow = 'hidden';
      } else {
      document.querySelector('.modal').classList.add('hide');
      document.body.style.overflow = '';
      }
    }

   getDataForModal() {

      return this.state.modalData;
    }

   documentListener= ()=> {
      document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('modal')){
          document.querySelector('.modal').classList.add('hide');
          document.body.style.overflow = '';
        }
      })
    }

    hideOldCards = ()=> {
      const tvShowsCards = document.querySelector('.tv-shows');
      tvShowsCards.style.display='none';
    }
    showOldCards = ()=> {
      const tvShowsCards = document.querySelector('.tv-shows');
      tvShowsCards.style.display='block';
    }

    onGetRatedAndNew = (quest)=> {

      this.getRatedAndNew(quest);
    }
    getSearchStatus = ()=> {

      return this.state.searchStatus;
    }

    getTotalPages = ()=> {
      return this.state.total_pages;
    }

    onSearchChange = (term)=> {
      if(term !== this.state.term) {
        this.setState ({
          current_page: 1
        })
      }
      this.setState({term});
      this.setState({searchStatus: 'Search results'});
      this.updateBase(term);
    }


    setCurrentPage = (page)=>{

     this.setState( { current_page: page} );

      switch (this.state.searchStatus){
        case 'Search results':
          this.updateBase(this.state.term, page);
         break;
        case 'Top rated movies':
          this.getRatedAndNew('top_rated', page);
         break;
         case 'Popular':
          this.getRatedAndNew('popular', page);
          break;
          case 'Upcoming movies in theatres':
            this.getRatedAndNew('upcoming', page);
          break;
          case 'Now playing in theatres':
          this.getRatedAndNew('now_playing', page);
          break;
          default:
           break;
       }
    }
    getCurrentPage = ()=> {
      
      return this.state.current_page;
    }


  render() {

    const { dbase } = this.state;
    const { searchStatus } = this.state;


      return (
          <div>
            <Menu
           onGetRatedAndNew={this.onGetRatedAndNew}
            />

            <Header
            onSearchChange={this.onSearchChange}
            searchStatus={ this.getSearchStatus }
            />

            <Main
            dbase={ dbase }
            searchStatus={ searchStatus }
            toggleModal={ this.toggleModal }
            getTotalPages={ this.getTotalPages }
            setCurrentPage={ this.setCurrentPage }
            getCurrentPage={ this.getCurrentPage }
            />

            <Modal
            toggleModal = { this.toggleModal }
            modalData={ this.getDataForModal() }/>

            <div className="loading">
                <div className=" loader">
                      <div className="loader--dot"></div>
                      <div className="loader--dot"></div>
                      <div className="loader--dot"></div>
                      <div className="loader--dot"></div>
                      <div className="loader--dot"></div>
                      <div className="loader--dot"></div>
                      <div className="loader--text"></div>
                </div>
            </div>

            <div className="preloader box">
              <div className="cat">
                 <div className="cat__body"></div>
                 <div className="cat__body"></div>
                 <div className="cat__tail"></div>
                 <div className="cat__head"></div>
              </div>
            </div>

           </div>
    );
  }

}
