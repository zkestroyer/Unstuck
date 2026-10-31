import asyncio
import os
import time
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'ur')
VOICE = "ur-PK-UzmaNeural"

RETRY_SCRIPTS = {
    "practice_intro_ur.mp3": "یہ ایک نقلی فون اسکرین ہے۔ آپ یہاں بے خوف ہو کر بٹن دبا سکتے ہیں۔ کوئی پیغام کسی کو نہیں جائے گا۔",
    "task_send_picture_step1_ur.mp3": "پیغام کے ساتھ کچھ منسلک کرنے والا بٹن تلاش کریں۔",
    "task_send_picture_step2_ur.mp3": "منسلک کرنے کے لیے ٹرے میں سے ایک تصویر منتخب کریں۔",
    "safety_scenario2_ur.mp3": "سیکیورٹی جانچ: بینک الرٹ کا مشکوک میسج ہے: آپ کا اکاؤنٹ بلاک کر دیا گیا ہے، فوری اس لنک پر کلک کریں۔ کیا آپ اس لنک کو کھولیں گے؟",
    "library_intro_ur.mp3": "تمام فیچرز اور مہارتوں کا نقشہ۔ تمام مشقیں آزمائیں اور جو چاہیں اپنی مرضی سے سیکھیں۔"
}

async def retry_all():
    for filename, text in RETRY_SCRIPTS.items():
        filepath = os.path.join(OUTPUT_DIR, filename)
        for attempt in range(4):
            try:
                print(f"Retrying ({attempt+1}/4): {filename}...")
                communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
                await communicate.save(filepath)
                if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
                    print(f"  SUCCESS: {filename} ({os.path.getsize(filepath)} bytes)")
                    break
            except Exception as e:
                print(f"  Attempt {attempt+1} failed: {e}")
                await asyncio.sleep(2)
        await asyncio.sleep(1)

if __name__ == '__main__':
    asyncio.run(retry_all())
