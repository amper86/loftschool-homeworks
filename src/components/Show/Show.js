import React, {Component} from 'react'
import './Show.css'

class Show extends Component {
    render() {
        const {currentShow} = this.props;
        //console.log(currentShow);
        //console.log(currentShow.summary);

        if (Object.keys(currentShow).length === 0) {
          return (<p className='show-information t-show-info'>Шоу не выбрано</p>)
        } else {
          return (
            <div className='show'>
              <img
                className='show-image'
                src={currentShow.image.medium}
                alt={currentShow.name}/>
              <h2 className='show-label t-show-name'>{currentShow.name}</h2>
              <p className='show-text t-show-genre'>
                <b>Жанр: </b>{currentShow.genres.join(', ')}
              </p>
              <p
                className='show-text t-show-summary'
                dangerouslySetInnerHTML={{ __html: currentShow.summary }}/>
            </div>
          )
        }
    }
}

export default Show