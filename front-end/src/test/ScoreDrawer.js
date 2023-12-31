import { Line } from "@nivo/line";

const noteTop = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];

export class ScoreDrawer {
  constructor() {
    this._canvas = document.createElement("canvas");
    this._canvas.width = window.innerWidth; // 초기화 추가
    this._canvas.height = 200;
    this._canvas.style.width = "100%";
    this._oct = 0;
    this._notes = new Array(300).fill(-1);
    this._colors = new Array(300).fill(-1);
    this._scores = new Array(100).fill(-1);
    this._beat = new Array(100).fill(-1);
    this._ment = new Array(100).fill(-1);
    this.stopRecord = false;
    this.height = 200;
    this.heightRect = 5;
    this.count = 0;
    this.turn = 0;
    this.rectWidth = 1.5;

    this._check = 1;

    this._screenWidth = window.innerWidth;
    this.LineLyrics = null;
  }

  getLineLyrics(LineLyrics) {
    this.LineLyrics = LineLyrics;
  }

  setStopRecord(t) {
    this.stopRecord = t;
  }
  getStopRecord() {
    return this.stopRecord;
  }

  renderElement() {
    return this._canvas;
  }

  _fitToContainer() {
    const { offsetWidth, offsetHeight } = this._canvas;
    this._canvas.width = offsetWidth;
    this._screenWidth = offsetWidth;

    const len = Math.floor(offsetWidth / 2);
    if (this._notes.length < len) {
      this._notes.unshift(...new Array(len - this._notes.length).fill(-1));
      this._colors.unshift(...new Array(len - this._colors.length).fill(-1));
    } else if (this._notes.length > len) {
      this._notes.splice(0, this._notes.length - len);
      this._colors.splice(0, this._colors.length - len);
    }
  }

  start(notes) {
    this._playScore = notes.slice();
    this._elapsed = -1000;
    this._scores = new Array(100).fill(-1);

    if (this._scores.length < this._playScore.length) {
      this._scores.unshift(
        ...new Array(this._playScore.length - this._scores.length).fill(-1)
      );
      this._beat.unshift(
        ...new Array(this._playScore.length - this._beat.length).fill(-1)
      );
      this._ment.unshift(
        ...new Array(this._playScore.length - this._ment.length).fill(-1)
      );
    } else if (this._scores.length > this._playScore.length) {
      this._scores.splice(0, this._scores.length - this._playScore.length);
      this._beat.splice(0, this._beat.length - this._playScore.length);
      this._ment.splice(0, this._ment.length - this._playScore.length);
    }
  }

  stop() {
    this.stopRecord = true;
    let perfect = 0;
    let good = 0;
    let sclenth = this._scores.length;
    for (let idx = 0; idx < sclenth; idx++) {
      const element = this._scores[idx];

      if (element === "perfect") {
        perfect += 1;
      } else if (element === "good") {
        good += 1;
      } else if (element === -1) {
        sclenth = idx + 1;
        break; // 루프 종료
      }
    }
    let beatTrue = 0;
    let btlength = this._beat.length;
    for (let idx = 0; idx < btlength; idx++) {
      const element = this._beat[idx];
      if (element === "true") {
        beatTrue += 1;
      } else if (element === -1) {
        btlength = idx + 1;
        break;
      }
    }
    perfect = perfect + good * 0.5;
    let PitchScore = 50 + Math.ceil((perfect * 50) / sclenth);
    this._playScore = [];
    let beatScore = 50 + Math.ceil((beatTrue * 50) / btlength);
    let data = {
      PitchScore: PitchScore,
      beatScore: beatScore,
      scores: this._scores,
      beat: this._beat,
    };
    return data;
  }

  get currentTime() {
    return this._elapsed;
  }

  _renderNotes(ctx) {
    ctx.save();
    const fps = 1000 / 60 / 2;
    const screenLength = this._screenWidth;
    const halfLength = screenLength / 2;
    ctx.translate(halfLength, 0);
    const screenTime = screenLength * fps;
    const half = screenTime / 2;
    const latency = 40 / fps;
    let playScoreidx = 0;
    for (var i = this._playScore.length - 1; i >= 0; i--) {
      if (this._playScore[i].note != -1) {
        playScoreidx = i;
        break;
      }
    }
    let current = null;

    this._playScore.forEach((note, index) => {
      if (note.note === -1) {
        if (this._scores[index] === -1) {
          this._scores[index] = -2;
        }
        return;
      }

      const x = (note.start - this._elapsed) / fps;
      if (x > halfLength) return;

      const width = note.length / fps - 1;
      if (x + width < -halfLength) return;

      const y =
        noteTop[note.note] * 5 +
        (note.octav - 3) * 35 +
        this.height +
        this._oct * 5 -
        2.5;

      if (this.LineLyrics) {
        let LineLyrics = document.querySelector("#lineLyrics");
        let nextLineLyrics = "";
        if (
          note.start <= this._elapsed &&
          note.start + note.length - fps >= this._elapsed
        ) {
          this.LineLyrics.forEach((element) => {
            if (
              element.startTime <= note.start &&
              note.start <= element.endTime
            ) {
              let lyricStart = element.startNode;
              let lyricend = element.endNode;

              for (let i = lyricStart; i <= lyricend; i++) {
                if (this._playScore[i].lylic) {
                  nextLineLyrics += this._playScore[i].lylic + "";
                } else {
                  nextLineLyrics = nextLineLyrics + " " + " ";
                }
              }
              return;
            }
          });
          LineLyrics.textContent = nextLineLyrics;
        }
      }

      if (
        note.start <= this._elapsed &&
        note.start + note.length - fps >= this._elapsed
      ) {
        current = note;
        ctx.fillStyle = "#00fffb";
      } else if (note.start > this._elapsed) {
        ctx.fillStyle = "#DDDDDD";
      } else {
        if (this._scores[index] === -1) {
          let t = Math.floor(this._elapsed - (note.start + note.length - fps));
          const len = this._colors.length;
          let st = len - Math.floor(width / 2);
          const scoreArray = this._colors.slice(st, len);
          const timeArray = this._colors.slice(st, st + 4);
          let BlackCount = 0;
          let BlueCount = 0;
          let RedCount = 0;
          let noCount = 0;
          let timeCount = 0;
          scoreArray.forEach((element) => {
            if (element === "red") {
              RedCount += 1;
            } else if (element === "blue") {
              BlueCount += 1;
            } else if (element === "black") {
              BlackCount += 1;
            } else noCount += 1;
          });
          timeArray.forEach((element) => {
            if (element === "black") {
              timeCount += 1;
            }
          });
          if (timeCount === 0) {
            this._beat[index] = "false";
          } else {
            this._beat[index] = "true";
          }
          let total = BlackCount + BlueCount + RedCount + noCount;
          if (BlackCount >= total * 0.7) {
            this._scores[index] = "perfect";
          } else if (BlackCount >= total * 0.5) {
            this._scores[index] = "good";
          } else {
            this._scores[index] = "bad";
          }
          if (RedCount >= total * 0.5) {
            this._ment[index] = "red";
          } else if (BlueCount >= total * 0.5) {
            this._ment[index] = "blue";
          } else if (BlackCount < total * 0.3) {
            this._ment[index] = "noPitch";
          }
        }
        if (this._scores[index] === "perfect") {
          ctx.fillStyle = "#ff33d4";
        } else if (this._scores[index] === "good") {
          ctx.fillStyle = "#86ff00";
        } else {
          ctx.fillStyle = "#ff2400";
        }
      }
      ctx.fillRect(
        (x + latency) * this.rectWidth,
        y,
        width * this.rectWidth,
        this.heightRect
      );
      if (note.lylic) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate((x + latency) * this.rectWidth, y);
        ctx.scale(1, -1);
        ctx.fillText(note.lylic, 0, 5);
        ctx.restore();
      }

      ctx.save();
      ctx.fillStyle = "white";
      ctx.translate((x + latency) * this.rectWidth, y);
      ctx.scale(1, -1);
      if (this._scores[index] === -1) {
        ctx.fillText("", 0, -30);
      } else {
        ctx.fillText(this._scores[index], 0, -30);
      }
      ctx.restore();
    });
    ctx.restore();
    this._currentNote = current;
    if (
      this._currentNote === this._playScore[playScoreidx] &&
      this._playScore.length !== 0
    ) {
      this._check = 0;
    } else if (
      this._check === 0 &&
      this._currentNote === null &&
      this._playScore.length !== 0
    ) {
      this._check = 1;
      this.stopRecord = true;
    }
  }

  getCurrentNote() {
    return this._currentNote;
  }

  pushNote(note) {
    this._notes.push(note);
    this._notes.shift();
    this._colors.push(-1);
    this._colors.shift();
  }

  scores() {
    return this._scores;
  }

  update(delta) {
    this._elapsed += delta;
  }

  render() {
    this._fitToContainer();
    const ctx = this._canvas.getContext("2d");
    ctx.save();
    ctx.font = "lighter 15px lineRg"; // 가사, bad
    ctx.textBaseline = "top";

    const colors = ["#eee", "#ddd"];
    ctx.scale(1, -1);
    ctx.translate(0, -300);

    this._renderLines(ctx);

    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "blue";
    this._renderNotes(ctx);

    this._renderVoice(ctx);

    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(this._screenWidth / 2, 160);
    ctx.lineTo(this._screenWidth / 2, 400);
    ctx.stroke();

    ctx.restore();
    ctx.font = "bold 25px lineRg";

    if (this._beat[0] === -1 && this._ment[0] === -1) {
      ctx.fillText("", 0, 20);
    } else {
      let comment = "";
      let beatcomment = "";
      let mentcomment = "";
      let beatLength = this._beat.length - 1;
      for (let j = beatLength; j >= 0; j--) {
        if (this._beat[j] !== -1 || this._ment[j] !== -1) {
          if (this._ment[j] === "red") {
            mentcomment = "음정이 높아요 Down! Down!";
            ctx.fillStyle = "red";
          } else if (this._ment[j] === "blue") {
            mentcomment = "음정이 떨어집니다!! Up! Up!";
            ctx.fillStyle = "blue";
          } else if (this._ment[j] === "noPitch") {
            mentcomment = "음정이 흔들리고 있어요 집중하세요!";
            ctx.fillStyle = "yellow";
          }
          if (this._beat[j] === "false") {
            beatcomment = "박자가 맞지 않습니다!!";
          }

          comment = mentcomment + " " + beatcomment;
          const strwidth = ctx.measureText(comment).width;
          const centerX = window.innerWidth / 2 - strwidth / 2 + this.count;
          const centerY = 180;

          if (mentcomment === "음정이 높아요 Down! Down!") {
            ctx.fillStyle = "red";
          } else if (mentcomment === "음정이 떨어집니다!! Up! Up!") {
            ctx.fillStyle = "blue";
          } else if (mentcomment === "음정이 흔들리고 있어요 집중하세요!") {
            ctx.fillStyle = "yellow";
          }
          ctx.fillText(mentcomment, centerX, centerY);
          // Draw beatcomment
          ctx.fillStyle = "purple"; // Set the color for beatcomment
          ctx.fillText(
            beatcomment,
            centerX + 10 + ctx.measureText(mentcomment).width,
            centerY
          );

          if (this.turn === 0) {
            this.count += 1;
          } else {
            this.count -= 1;
          }
          if (this.count == 50) {
            this.turn = 1;
          } else if (this.count === 0) {
            this.turn = 0;
          }
          break;
        }
      }
    }
  }

  _renderVoice(ctx) {
    ctx.fillStyle = "red";
    const fps = 1000 / 60 / 2;
    const screenLength = this._screenWidth;
    const halfLength = screenLength / 2;
    const screenTime = screenLength * fps;
    const half = screenTime / 2;
    const latency = 40 / fps;
    let curNote = this.getCurrentNote();
    let curNoteY = 0;
    if (curNote !== null) {
      curNoteY =
        noteTop[curNote.note] * 5 +
        (curNote.octav - 3) * 35 +
        this.height +
        this._oct * 5 -
        2.5;
    }
    this._notes.forEach((note, x) => {
      if (this._notes[x + 1] || this._notes[x + 2]) {
        if (this._notes[x + 1] !== note || this._notes[x + 2] !== note) {
          note = -1;
        }
      }
      ctx.fillStyle = "red";
      if (note !== -1) {
        const octav = Math.floor(note / 12) - 4;
        const n = note % 12;
        let y = noteTop[n] * 5 + this.height + octav * 35 - 2.5;
        if (this._colors[x] !== -1) {
          if (this._colors[x] === "black") {
            ctx.fillStyle = "#ff33d4";
          } else {
            ctx.fillStyle = this._colors[x];
          }
        } else if (curNote != null) {
          ctx.fillStyle = "red";
          this._colors[x] = "red";

          if (Math.abs(curNoteY - y) <= 5) {
            ctx.fillStyle = "#ff33d4";
            this._colors[x] = "black";
          } else if (curNoteY > y) {
            ctx.fillStyle = "blue";
            this._colors[x] = "blue";
          }
        }

        ctx.save();

        ctx.translate((x - halfLength - latency) * this.rectWidth, 0);
        ctx.fillRect(
          (x + latency) * this.rectWidth - halfLength / 2,
          y,
          3,
          this.heightRect
        );

        ctx.restore();
      }
    });
  }

  inited() {
    this._inited = true;
  }

  _renderLines(ctx) {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    const heightSetting = 10;
    const h = 160;
    const h1 = heightSetting * 5 + h;
    const h2 = heightSetting * 10 + h;
    for (let i = 0; i < 5; i++) {
      ctx.moveTo(0, i * heightSetting + h1);
      ctx.lineTo(this._screenWidth, i * heightSetting + h1);
    }
    ctx.stroke();
    ctx.strokeStyle = "#ddd";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.moveTo(0, i * heightSetting + h2);
      ctx.lineTo(this._screenWidth, i * heightSetting + h2);
      ctx.moveTo(0, i * heightSetting + h);
      ctx.lineTo(this._screenWidth, i * heightSetting + h);
    }
    ctx.stroke();
  }
}
