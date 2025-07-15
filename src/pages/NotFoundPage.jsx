import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const NotFoundPage = () => {
  return (
    <div className='NotFoundPage'>
      <div className="error">
        <div className="error-title">
          <h1>404</h1>
          <h3>:(</h3>
        </div>
        <h5>ERROR</h5>
        <p>
          이런..찾는 페이지가 없습니다 <br />
          홈으로 돌아가거나 다른 길을 찾아보세요
        </p>
        <div className="home-btn">
          <a href="/">GO HOME</a>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
