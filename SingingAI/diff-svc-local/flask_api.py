import io
import logging

import librosa
import soundfile
from flask import Flask, request, send_file
from flask_cors import CORS

from infer_tools.infer_tool import Svc
from utils.hparams import hparams

app = Flask(__name__)

CORS(app)

logging.getLogger('numba').setLevel(logging.WARNING)


@app.route("/voiceChangeModel", methods=["POST"])
def voice_change_model():
    request_form = request.form
    wave_file = request.files.get("sample", None)
    # transpose
    f_pitch_change = float(request_form.get("fPitchChange", 0))
    # DAW에서 요구하는 sample rate
    daw_sample = int(float(request_form.get("sampleRate", 0)))
    speaker_id = int(float(request_form.get("sSpeakId", 0)))
    # http wav 파일 가져오기 및 반환
    input_wav_path = io.BytesIO(wave_file.read())
    # 모델 추론
    _f0_tst, _f0_pred, _audio = model.infer(input_wav_path, key=f_pitch_change, acc=accelerate, use_pe=False,
                                            use_crepe=False)
    tar_audio = librosa.resample(_audio, hparams["audio_sample_rate"], daw_sample)
    # 오디오 반환
    out_wav_path = io.BytesIO()
    soundfile.write(out_wav_path, tar_audio, daw_sample, format="wav")
    out_wav_path.seek(0)
    return send_file(out_wav_path, download_name="temp.wav", as_attachment=True)


if __name__ == '__main__':
    # training에 사용되는 프로젝트 폴더 이름
    project_name = "firefox"
    model_path = f'./checkpoints/{project_name}/model_ckpt_steps_188000.ckpt'
    config_path = f'./checkpoints/{project_name}/config.yaml'

    # accelerate rate
    accelerate = 50
    hubert_gpu = True

    model = Svc(project_name, config_path, hubert_gpu, model_path)

    # vst 플러그인; 변경하지 않는 것이 좋음.
    app.run(port=6842, host="0.0.0.0", debug=False, threaded=False)
