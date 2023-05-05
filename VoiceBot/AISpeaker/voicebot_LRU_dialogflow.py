import time,os
from collections import OrderedDict
import speech_recognition as sr
from gtts import gTTS
from playsound import playsound
import shutil
import google.cloud.dialogflow_v2 as dialogflow
# from IPython.display import Audio
# from IPython.display import display
# import IPython.display as ipd
# import numpy

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] ='chatbot-pyos-3384ec921f92.json'
DIALOGFLOW_PROJECT_ID ='chatbot-pyos'
DIALOGFLOW_LANGUAGE_CODE ='ko'
SESSION_ID ='me'
session_client = dialogflow.SessionsClient()
session = session_client.session_path(DIALOGFLOW_PROJECT_ID,SESSION_ID)


CACHE_CAPACITY = 5
cache = OrderedDict()
cache_path = "audio_cache"
#all_audios_path = "All_audios"#dialogflow에 연동할 예정

# def SoundNotification():
#     sr = 22050 # sample rate
#     T = 0.5    # seconds
#     t = numpy.linspace(0, T, int(T*sr), endpoint=False) # time variable
#     x = 0.5*numpy.sin(2*numpy.pi*440*t)              # pure sine wave at 440 Hz
#     ipd.Audio(x, rate=sr, autoplay=True)

def play_audio_from_cache(file_name):
    # Audio(os.path.join(cache_path, file_name), autoplay=True)
    playsound(os.path.join(cache_path, file_name))

def update_cache(file_name):#캐시 폴더 업데이트
    if file_name in cache:
        cache.move_to_end(file_name, last=False)
    else:
        if len(cache) == CACHE_CAPACITY:
            lru_file = cache.popitem()[1]
            print(f"lru_file: {lru_file}")
            os.remove(os.path.join(cache_path, lru_file))#캐시 폴더에서 오래된 파일 삭제
        # cache[file_name] = file_name
        # cache.move_to_end(file_name, last=False)
        # shutil.copy(os.path.join(all_audios_path, file_name), os.path.join(cache_path, file_name))
        print('캐시 업데이트 완료')

#audio_cache와 cache동기화
def synchronize_cache_with_folder():
    for file_name in os.listdir(cache_path):
        if file_name.endswith(".wav"):
            cache[file_name] = file_name
            cache.move_to_end(file_name, last=False)

# 음성 인식 (듣기, STT)
def listen(recognizer, audio):
    try:
        text = recognizer.recognize_google(audio, language = 'ko')
        print('[와우지능]' + text)
        answer(text)
    except sr.UnknownValueError:
        print('인식 실패') # 음성 인식 실패한 경우
        play_audio_from_cache('audio_cache/재질문.mp3')
    except sr.RequestError as e:
        print('요청 실패 : {0}'.format(e)) # API Key 오류, 네트워크 단절 등

# 대답
def answer(input_text):
    print('[와우지능]' + input_text)
    file_name = f'{input_text}.wav'
    if os.path.exists(os.path.join(cache_path, file_name)):
        print(f"Playing {file_name} from cache")
        play_audio_from_cache(file_name)
        print('캐시 안에 존재합니다.')
        update_cache(file_name)
        print('===================')            
    else:
        #dialogflow에서 답변 받아오기
        print(f"답변받아오는중")
        our_input = dialogflow.types.TextInput(text=input_text,language_code=DIALOGFLOW_LANGUAGE_CODE)
        query = dialogflow.types.QueryInput(text=our_input)
        response = session_client.detect_intent(session=session,query_input=query)
        
        #파일명 dialogflow의 intent로 할지, 사용자 질문으로 할지 고민중
        speak(response.query_result.fulfillment_text, response.query_result.intent.display_name)

# 소리내어 읽기
def speak(text, file_name):
    print('[인공지능] ' + text)
    file = f'{file_name}.wav'
    tts = gTTS(text=text, lang='ko')
    #캐시 업데이트 후 플레이
    update_cache(file)
    tts.save(f'audio_cache/{file}')
    # ipd.Audio(filename=f'audio_cache/{file}', autoplay=True)
    playsound(file)


r = sr.Recognizer()
m = sr.Microphone()

synchronize_cache_with_folder()

# speak('무엇을 도와드릴까요?')

speak('동국 군청입니다. 식사하셨습니까?', 'hello')
stop_listening = r.listen_in_background(m, listen)
# answer("안녕")
# answer("고마워")
# answer("물 줄까?")
# answer("종료")
# stop_listening(wait_for_stop = False) # 더 이상 듣지 않음 

#while True:
    #time.sleep(0.1) 
