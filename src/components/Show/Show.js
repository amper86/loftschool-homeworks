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

  render() {
    const {showId, data} = this.state;

    if (!showId) {
      return (<p className='show-information t-show-info'>Шоу не выбрано</p>)
    } else if (Object.keys(data).length === 0) {
      return (<p className='show-information t-show-info'>Загрузка!!!</p>)
    } else {
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
    }
  }
}

export default Show