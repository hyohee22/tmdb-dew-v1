import React from 'react'
import PopularMovieSlide from './homepage/PopularMovieSlide/PopularMovieSlide'

const MyPage = () => {
  return (
    <div className='mypage'>
      <div className="mypage-title">
        My Page
      </div>
      <div className="mypage-wrap">
        <div className="mypage-info">
          <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F6d%2Fe6%2F81%2F6de681d7633dfba156647919781d08de.jpg&type=sc960_832" alt="" />
          <h2>야옹이<i class="bi bi-pencil-fill"></i></h2>
          <span>catcat@cattt.com</span><br />
          <button>
            <i class="bi bi-clipboard-heart-fill"></i>내 정보
          </button>
          <button>
            <i class="bi bi-bell-fill"></i> 알림함
          </button>
          <button>
            <i class="bi bi-chat-dots-fill"></i> 공지사항
          </button>
          <button className='logout'>
            <i class="bi bi-box-arrow-right"></i> 로그아웃
          </button>
        </div>
        <div className="mypage-data">
          <h2>시청내역</h2>
          <span>시청내역을 볼 수 있습니다!</span>
          <table>
            <tr>
              <th>날짜</th>
              <th>제목</th>
              <th>시청시간</th>
              <th>시청횟수</th>
            </tr>
            <tr>
              <td>2025.07.01</td>
              <td>둘리 : 얼음별 대모험</td>
              <td>320분</td>
              <td>2회</td>
            </tr>
            <tr>
              <td>2025.07.03</td>
              <td>어벤저스 : 엔드게임</td>
              <td>90분</td>
              <td>1회</td>
            </tr>
            <tr>
              <td>2025.07.05</td>
              <td>아쿠아맨2</td>
              <td>500분</td>
              <td>4회</td>
            </tr>
            <tr>
              <td>2025.07.14</td>
              <td>태극기 휘날리며</td>
              <td>120분</td>
              <td>1회</td>
            </tr>
          </table>
          <h2>찜 목록</h2>
          <span>찜 목록을 볼 수 있습니다!</span>
          <PopularMovieSlide />
        </div>
      </div>
    </div>
  )
}

export default MyPage