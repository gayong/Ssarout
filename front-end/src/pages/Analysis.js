import React from "react";


const lyricsTime =[{"startnode":0,"endnode":20,"starttime":0,"endtime":9000},
{"startnode":21,"endnode":36,"starttime":9000,"endtime":13800},
{"startnode":37,"endnode":49,"starttime":13800,"endtime":19200},
{"startnode":50,"endnode":71,"starttime":19200,"endtime":28200},
{"startnode":72,"endnode":87,"starttime":28200,"endtime":33000},
{"startnode":88,"endnode":99,"starttime":33000,"endtime":37200},
{"startnode":100,"endnode":114,"starttime":37200,"endtime":41400},
{"startnode":115,"endnode":132,"starttime":41400,"endtime":46800},
{"startnode":133,"endnode":147,"starttime":46800,"endtime":51000},
{"startnode":148,"endnode":163,"starttime":51000,"endtime":57600},
{"startnode":164,"endnode":184,"starttime":57600,"endtime":66600},
{"startnode":185,"endnode":200,"starttime":66600,"endtime":71400},
{"startnode":201,"endnode":212,"starttime":71400,"endtime":75600},
{"startnode":213,"endnode":227,"starttime":75600,"endtime":79800},
{"startnode":228,"endnode":245,"starttime":79800,"endtime":85200},
{"startnode":246,"endnode":260,"starttime":85200,"endtime":89400},
{"startnode":261,"endnode":276,"starttime":89400,"endtime":94200},
{"startnode":277,"endnode":294,"starttime":94200,"endtime":99000},
{"startnode":295,"endnode":302,"starttime":99000,"endtime":101400},
{"startnode":303,"endnode":317,"starttime":101400,"endtime":106200},
{"startnode":318,"endnode":327,"starttime":106200,"endtime":108900},
{"startnode":328,"endnode":346,"starttime":108900,"endtime":114150},
{"startnode":347,"endnode":361,"starttime":114150,"endtime":119100},
{"startnode":362,"endnode":379,"starttime":119100,"endtime":123900},
{"startnode":380,"endnode":417,"starttime":123900,"endtime":132900},
{"startnode":418,"endnode":432,"starttime":132900,"endtime":137550},
{"startnode":433,"endnode":450,"starttime":137550,"endtime":142350},
{"startnode":451,"endnode":465,"starttime":142350,"endtime":147150},
{"startnode":466,"endnode":481,"starttime":147150,"endtime":151500}]

const LyricsBar = ({ val, startTime, endTime,endnode }) => {
  const timeInterval = endTime - startTime;
  console.log(endTime)
  const barStyle = {
    width: `${(timeInterval / lyricsTime[endnode].endtime) * 100}%`,
    height: "10px",
    backgroundColor: val === true ? 'green' : 'red'
  };

  return <div className="lyrics-bar" style={barStyle}></div>;
};

const Analysis = () =>{
  let data = localStorage.getItem('data')
  data = JSON.parse(data)
  console.log(data)
  let idx = data.scores.length
  for(let i = 0;i<idx; i++){
    if(data.scores[i] === -1){
      idx = i-1
      break
    }
  }
  console.log(idx)

  let nodeidx = lyricsTime.length
  for(let i = 0; i<nodeidx; i++){
    if(lyricsTime[i].startnode <= idx&&lyricsTime[i].endnode >= idx){
      nodeidx = i
      break
    }
  }
  console.log(nodeidx)
  const resultArray = new Array(nodeidx +1);
  for(let i = 0; i<nodeidx+1; i++){
    let bad = 0
    let lyricObject = Object()
    for(let j = lyricsTime[i].startnode; j<lyricsTime[i].endnode+1;j++){
      if (data.scores[j] === "bad"){
        bad += 1
      }
    }
    if(bad >=(lyricsTime[i].endnode-lyricsTime[i].startnode+1)/2 ){
      lyricObject = {'val':false}
    } else{
      lyricObject = {'val':true}
    }
    lyricObject.startTime = lyricsTime[i].starttime
    lyricObject.endTime = lyricsTime[i].endtime
    lyricObject.endnode = nodeidx

    console.log(lyricObject)
    resultArray[i] = lyricObject
    
  }
  console.log(resultArray)



  // style
  const flexContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // 필요한 경우 정렬 방식 설정
    
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="card">
      <div style={cardStyle}>
        <div className="bar-container">
          <div style={flexContainerStyle}>
            {resultArray.map((timeInfo, index) => (
              <LyricsBar
                key={index}
                index={index}
                startTime={timeInfo.startTime}
                endTime={timeInfo.endTime}
                endnode={timeInfo.endnode}
                val={timeInfo.val}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis