import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/commonUse/Header'
import Footer from '../components/commonUse/Footer';
import Api from "../Api/Api";
import styles from "./Growth.module.css";


const Growth = () => {
  const data = useParams(); // songId, title, singer
  const [growthGraph, setGrowthGraph] = useState([]);

  const getGrowthGraph = async () => {
    try {
      const response = await Api.get(`/api/v1/result/recorded-songs/${data.songId}`);
      console.log(response.data)
      console.log(response.data.data.results)
      console.log(response.data.data.results[0].accuracy)
      setGrowthGraph(response.data.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGrowthGraph();
    console.log(data)
    console.log(window.location)
  }, [data]);

  return (
    <div>
      <Header/>
      <button className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>뒤로가기</Link></button>

      {growthGraph.map((item, index) => (
        <div key={index} className={styles.favsongData}>
          <p className={styles.recordTitle}>{data.title} - {data.singer}</p>
          <p className={styles.recordAvg}>{item.accuracy}%</p>
          <p className={styles.recordAvg}>{item.createdDateTime}%</p>
          <hr/>
        </div>
      ))}

      <Footer/>
    </div>
  );
};

export default Growth;
