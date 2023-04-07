# 이 코드는 마이크를 통해 사용자의 음성을 입력받아 Google Cloud Speech-to-Text API를 사용해 텍스트로 변환하고, 변환된 텍스트를 Dialogflow API로 전송합니다. 그런 다음 챗봇 응답을 Google Cloud Text-to-Speech API로 전송하여 음성 데이터를 가져오고, pyaudio 라이브러리를 사용하여 음성 데이터를 출력합니다.

# 이 프로그램을 실행하면, 마이크를 통해 음성으로 질문을 하고 챗봇이 음성으로 응답하는 시스템을 구현할 수 있습니다.

import os
import io
import sys
from google.cloud import dialogflow_v2, speech_v1p1beta1, texttospeech_v1
import pyaudio

# 환경 변수 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "chatbot-pyos-3384ec921f92.json"

# Dialogflow ES 에이전트 정보
project_id = "your_project_id"
session_id = "your_session_id"
language_code = "ko"

# Speech-to-Text 설정
stt_client = speech_v1p1beta1.SpeechClient()
config = speech_v1p1beta1.RecognitionConfig(
    encoding=speech_v1p1beta1.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code=language_code,
)
streaming_config = speech_v1p1beta1.StreamingRecognitionConfig(
    config=config, interim_results=True
)

# 마이크 입력 스트림 설정
class MicrophoneStream:
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk
        self._buffer = io.BytesIO()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=self._rate,
            input=True,
            frames_per_buffer=self._chunk,
            stream_callback=self._fill_buffer,
        )

        self.closed = False
        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        self._buffer.close()
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        self._buffer.write(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            chunk = self._buffer.read(self._chunk)
            if chunk:
                yield speech_v1p1beta1.StreamingRecognizeRequest(audio_content=chunk)
            else:
                return

# 음성 입력 및 인식
user_input = None
with MicrophoneStream(16000, 1024) as stream:
    audio_generator = stream.generator()
    requests = (speech_v1p1beta1.StreamingRecognizeRequest(audio_content=content) for content in audio_generator)

    # Speech-to-Text API 호출
    responses = stt_client.streaming_recognize(streaming_config, requests)

    # 첫 번째 음성 인식 결과 가져오기
    for response in responses:
        if response.results and response.results[0].alternatives:
            user_input = response.results[0].alternatives[0].transcript
            break

if user_input is None:
    print("음성 인식에 실패했습니다. 다시 시도해주세요.")
    sys.exit(1)



# Dialogflow API 호출을 위한 클라이언트 및 세션 설정
session_client = dialogflow_v2.SessionsClient()
session = session_client.session_path(project_id, session_id)

# Dialogflow API 호출
query_input = dialogflow_v2.types.QueryInput(text=dialogflow_v2.types.TextInput(text=user_input, language_code=language_code))
response = session_client.detect_intent(session=session, query_input=query_input)

# 챗봇 응답 텍스트
response_text = response.query_result.fulfillment_text

# Text-to-Speech API 호출을 위한 클라이언트 및 설정
tts_client = texttospeech_v1.TextToSpeechClient()
input_text = texttospeech_v1.SynthesisInput(text=response_text)
voice_config = texttospeech_v1.VoiceSelectionParams(language_code=language_code, ssml_gender=texttospeech_v1.SsmlVoiceGender.FEMALE)
audio_config = texttospeech_v1.AudioConfig(audio_encoding=texttospeech_v1.AudioEncoding.LINEAR16)

# Text-to-Speech API 호출
tts_response = tts_client.synthesize_speech(input=input_text, voice=voice_config, audio_config=audio_config)

# 음성 출력을 위한 설정
pya = pyaudio.PyAudio()
stream = pya.open(format=pyaudio.paInt16, channels=1, rate=24000, output=True)

# 음성 출력
stream.write(tts_response.audio_content)

# 스트림 정리
stream.stop_stream()
stream.close()
pya.terminate()
