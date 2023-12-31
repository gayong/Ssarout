//Growth.js
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Header from '../components/commonUse/Header'
import Api from "../Api/Api";
import styles from "./Growth.module.css";
import { ResponsiveLine } from '@nivo/line'

const Growth = () => {
  const data = useParams();
  const [growthGraph, setGrowthGraph] = useState([]);
  const [songTitle, setSongTitle] = useState();
  const [singer, setSinger] = useState();
  const navigate = useNavigate()

  const getGrowthGraph = async () => {
    try {
      const response = await Api.get(`/api/v1/result/recorded-songs/${data.songId}`);
      setGrowthGraph(response.data.data.results);
    } catch (error) {
      console.error(error);
      navigate(-1)
    }
    try {
      const responseSongData = await Api.get('/api/v1/song/info',{params :{songId:data.songId} });
      setSongTitle(responseSongData.data.data.title)
      setSinger(responseSongData.data.data.singer)
    } catch (error){
      console.error(error);
    }
  };

  useEffect(() => {
    getGrowthGraph();
  }, [data]);

  const formatDate = (dateString) => { // 연도월일시간 합쳐진 데이터 쪼개기
    const formattedDate = dateString.slice(5, 10);
    return formattedDate.replace('-', '/');
  };

  const test = [
    {
      "id": songTitle,
      "data": growthGraph.map(item => ({
        "x": item.createdDateTime,
        "y": item.accuracy,
      })),
    },
  ]
  
  const MyResponsiveLine = () => (
    <div style={{ width: 'auto', height: '90vw', margin: '0 auto' }}>
    <ResponsiveLine
        data={test}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        theme={{
          textColor: "#FFFFFF",
          fontSize: 14,
          fontFamily: 'lineRg',
          axis: { // 바닥 날짜
            ticks: {
                text: {
                    fontSize: 11,
                    fill: '#c7c7c7',
                },
            },
          },
          grid: {
            line: {
              strokeDasharray: "5 5", // 배경 가로세로 줄 dash
              opacity: 0.5,
            }
          }
        }}
        xScale={{ type: 'point' }} // 동그라미 위 숫자
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{ // 바닥에 날짜부분
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            format: (values) => formatDate(values), // 이게 데이터 format화
            // 안하면 같은 날짜 녹음은 한개로 그룹핑됨
        }}
        axisLeft={null}
        enableGridX={true} // 배경 세로 줄
        colors="#ffb860" // 데이터들 잇는 선 색
        pointSize={13}
        pointColor="#ffb860" // 동그라미
        pointBorderWidth={2}
        pointBorderColor="#ffb860" // 동그라미 테두리
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-16}
        enableArea={false} // 동그라미 아래 영역 색 채우기
        useMesh={false}
        legends={[]}
        isInteractive={false} // 값 눌렀을때 작게 뜨는거
        enableSlices="x"
    /></div>
  )

  return (
    <div className="growthContainer">
      <Header/>
      <br/><br/><br/>
      <p className={styles.recordTitle}>{songTitle} - {singer}</p>
      <MyResponsiveLine/>
      <br/><br/>
      <button className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>확인</Link></button>
    </div>
  );
};

export default Growth;
