import React, {Component} from 'react'
import {getShowInfo} from '../../api';
import './Show.css'

class Show extends Component {
  state = {
    showId: '',
    data: {}
  };

  static getDerivedStateFromProps(nextProp, prevState) {
    if (prevState.showId !== nextProp.showId) {
      return {
        showId: nextProp.showId,
        data: {}
      }
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showId !== this.state.showId) {
      getShowInfo(this.state.showId).then(res => {
        this.setState({...this.state, data: res})
      })
    }
  }

  noShowRender = () => {
    return (<p className='show-information t-show-info'>Шоу не выбрано</p>);
  };

  preloaderRender = () => {
    return (<p className='show-information t-show-info'>Загрузка!!!</p>);
  };

  showRender = () => {
    const { data } = this.state;
    return (
      <div className='show'>
        <img
          className='show-image'
          src={data.image.medium}
          alt={data.name}/>
        <h2 className='show-label t-show-name'>{data.name}</h2>
        <p className='show-text t-show-genre'>
          <b>Жанр: </b>{data.genres.join(', ')}
        </p>
        <p
          className='show-text t-show-summary'
          dangerouslySetInnerHTML={{ __html: data.summary }}/>
      </div>
    )
  };

  showContent = () => {
    const {showId, data} = this.state;

    if (!showId) {
      return this.noShowRender()
    } else if (Object.keys(data).length === 0) {
      return this.preloaderRender()
    } else {
      return this.showRender()
    }
  };

  render() {
    return this.showContent();
  }
}

export default Show