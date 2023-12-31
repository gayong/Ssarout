import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Api from '../Api/Api';
import Header from "../components/commonUse/Header"
import Footer from '../components/commonUse/Footer';
import styles from "./SingingAI.module.css";
import play from '../components/history/play.png';
import pause from '../components/history/pause.png'

const AISongs = () =>{
  const [AIResults, setAIResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const removeDuplicates = (arr, prop) => { // 같은 노래 파일 여러 개인 경우 중복 제거
    return arr.filter((obj, index, self) =>
      index === self.findIndex(item => item[prop] === obj[prop])
    );
  };

  const getAISongs = async () => {
    try {
      const response = await Api.get("/api/v1/ai/covers");
      setAIResults(response.data.data.results.map(item => ({ ...item, audio1: new Audio(item.aiCoverFile)})));
    } catch (error) {
      console.error(error);
    }
  };

  const playAudio = async (index) => {
    if (activeIndex !== null) {
      await pauseAudio(activeIndex);
    }
  
    setActiveIndex(index);
    AIResults[index].audio1.currentTime = 60;
    await AIResults[index].audio1.play();
  };

  const pauseAudio = (index) => {
    setActiveIndex(null);
    AIResults[index].audio1.pause();
    AIResults[index].audio1.currentTime = 0; // 오디오 시간 초기화
  };

  const reloadPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    getAISongs();

    let stopSongInterval;
    stopSongInterval = setInterval(() => {
      if (!window.location.pathname.includes('/singingAI') && activeIndex !== null) {
        pauseAudio(activeIndex);
        clearInterval(stopSongInterval);
      }
    }, 100);
    return () => {
      clearInterval(stopSongInterval);
      if (activeIndex !== null) {
        pauseAudio(activeIndex);
      }
    };
  }, [activeIndex]);

  return(
    <>
      <div class="container">
      <Header/>
      <button onClick={reloadPage} className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>뒤로가기</Link></button>
      <h3 className={styles.pageTitle}>AI가 불러주는 노래</h3>

      <div className={styles.aiContainer}>
      {removeDuplicates(AIResults, 'title').map((item, index) => (
          <div key={index} className={styles.aiData}>
            <img className={styles.aiAlbumcover} alt="" src={item.albumCoverImage} />
            <p className={styles.titleNsinger}>{item.title} - {item.singer}</p>
            {activeIndex === index ? (
              <img className={styles.playBtn} alt="pause" src={pause} onClick={() => pauseAudio(index)}/>
            ) : (
              <img className={styles.playBtn} alt="play" src={play} onClick={() => playAudio(index)}/>
            )}          
            </div>
        ))}
      </div>
      </div>
      <Footer/>
    </>
  )
}
export default AISongs