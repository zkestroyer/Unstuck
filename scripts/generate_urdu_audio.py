import asyncio
import os
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'ur')
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ur-PK-UzmaNeural"

AUDIO_SCRIPTS = {
    # Screen 1: Welcome
    "welcome_ur.mp3": "آئیے ٹیکنالوجی استعمال کرنے کی مشق کریں۔ پہلے یہاں محفوظ طریقے سے کوشش کریں۔ آپ کے اصلی فون کو کچھ نہیں ہوگا۔ کسی اکاؤنٹ یا پاس ورڈ کی ضرورت نہیں۔ اطمینان سے سیکھیں۔",

    # Screen 2: Fear Map Header
    "fear_map_header_ur.mp3": "آپ کس کام میں آسانی اور اعتماد چاہتے ہیں؟ جس چیز میں ہچکچاہٹ ہو اسے منتخب کریں۔ آپ بعد میں کبھی بھی تبدیل کر سکتے ہیں۔",

    # Screen 2: 7 Concern Cards
    "concern_wrong_button_ur.mp3": "مجھے ڈر ہے کہ میں غلط بٹن دبا دوں گا۔ جانیں کہ بٹن اور شبیہیں دبانے سے پہلے کیا کرتی ہیں۔",
    "concern_deleting_ur.mp3": "مجھے فکر ہے کہ میں کچھ ڈیلیٹ کر دوں۔ چیزیں کھونے کے خوف کے بغیر محفوظ طریقے سے منتخب کرنے کی مشق کریں۔",
    "concern_navigation_ur.mp3": "مجھے فون پر چیزیں ڈھونڈنا مشکل لگتا ہے۔ مینو، تصاویر، اور پیغامات آسانی سے تلاش کرنا سیکھیں۔",
    "concern_sending_picture_ur.mp3": "میں تصویریں یا فائلیں بھیجنا سیکھنا چاہتا ہوں۔ پیغام میں تصویر منسلک کرنے اور بھیجنے کی مرحلہ وار مشق۔",
    "concern_message_safety_ur.mp3": "کچھ پیغامات مجھے الجھن میں ڈال دیتے ہیں۔ مشکوک پیغامات اور کوڈز مانگنے والوں کی پہچان سیکھیں۔",
    "concern_prefers_audio_ur.mp3": "میں پڑھنے کی بجائے سننا پسند کرتا ہوں۔ ہر ہدایت کے ساتھ بولنے والا بٹن دستیاب ہوگا تاکہ آپ سن سکیں۔",
    "concern_language_difficulty_ur.mp3": "فون پر الفاظ سمجھنا مشکل ہے۔ ہم بغیر مشکل اصطلاحات کے، عام فہم زبان میں سب سمجھاتے ہیں۔",

    # Screen 3: Recommendation Screen per module
    "rec_send_picture_ur.mp3": "آپ کے لیے تجویز کردہ مشق: پیغام میں تصویر بھیجیں۔ یہ تجویز کیوں دی گئی: آئیے ایک عام اور مفید کام سے شروع کریں، یعنی پیغام میں تصویر بھیجنا۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔",
    "rec_maps_ur.mp3": "آپ کے لیے تجویز کردہ مشق: نقشے پر جگہ تلاش کریں اور لوکیشن شیئر کریں۔ یہ تجویز کیوں دی گئی: اپنے پیاروں کے ساتھ محفوظ طریقے سے اپنی لوکیشن شیئر کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔",
    "rec_delete_ur.mp3": "آپ کے لیے تجویز کردہ مشق: محفوظ ڈیلیشن اور تصویر کی بحالی۔ یہ تجویز کیوں دی گئی: تصویر ڈیلیٹ کرنے کے بعد اسے کوڑے دان سے بحال کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔",
    "rec_check_message_ur.mp3": "آپ کے لیے تجویز کردہ مشق: مشکوک پیغامات کی جانچ۔ یہ تجویز کیوں دی گئی: مشکوک پیغامات اور جعلی کوڈز کی جانچ کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔",

    # Screen 4: Practice Intro
    "practice_intro_ur.mp3": "یہ ایک نقلی فون اسکرین ہے۔ آپ یہاں بے خوف ہو کر بٹن دبا سکتے ہیں۔ کوئی پیغام کسی کو نہیں جائے گا۔",

    # Task A: Send Picture Steps
    "task_send_picture_step1_ur.mp3": "پیغام کے ساتھ کچھ منسلک کرنے والا بٹن تلاش کریں۔",
    "task_send_picture_step2_ur.mp3": "منسلک کرنے کے لیے ٹرے میں سے ایک تصویر منتخب کریں۔",
    "task_send_picture_step3_ur.mp3": "تصویر کے ساتھ پیغام بھیجیں۔",

    # Task B: Maps & Location Steps
    "task_maps_step1_ur.mp3": "نقشے کی سرچ بار میں فارمیسی تلاش کریں۔",
    "task_maps_step2_ur.mp3": "اپنے مقام کو شیئر کرنے کا بٹن دبائیں۔",
    "task_maps_step3_ur.mp3": "15 منٹ کے لیے اپنی لائیو لوکیشن بھیجنے کی تصدیق کریں۔",

    # Task C: Safe Delete Steps
    "task_delete_step1_ur.mp3": "تصویر منتخب کر کے کوڑے دان کا آئیکن دبائیں۔",
    "task_delete_step2_ur.mp3": "ریسنٹلی ڈیلیٹڈ یعنی کوڑے دان کے فولڈر میں جائیں۔",
    "task_delete_step3_ur.mp3": "تصویر پر ری سٹور کا بٹن دبا کر اسے گیلری میں بحال کریں۔",

    # Independent Attempt
    "independent_prompt_ur.mp3": "اب خود کوشش کر کے دیکھیں! کیا آپ اپنے دوست کو پھولوں کی تصویر بھیج سکتے ہیں؟ اطمینان سے کریں۔ آپ جب چاہیں اشارہ مانگ سکتے ہیں۔",

    # Safety Scenarios
    "safety_scenario1_ur.mp3": "سیکیورٹی جانچ: مشکوک پیغامات۔ نامعلوم نمبر سے میسج ہے: آپ کا انعام کا کوڈ 4829 ہے۔ کسی کے ساتھ شیئر نہ کریں۔ کیا آپ یہ کوڈ فون پر کسی کو بتائیں گے؟",
    "safety_scenario2_ur.mp3": "سیکیورٹی جانچ: بینک الرٹ کا مشکوک میسج ہے: آپ کا اکاؤنٹ بلاک کر دیا گیا ہے، فوری اس لنک پر کلک کریں۔ کیا آپ اس لنک کو کھولیں گے؟",

    # Summary Screen
    "summary_ur.mp3": "آج آپ نے جو مشق کی۔ آپ کے سیکھنے کے سفر کا سچا ریکارڈ۔ کوئی نمبر یا دباؤ نہیں۔ اگلی تجویز کردہ مشق آزمائیں اور اپنی رفتار سے سیکھتے رہیں۔",

    # Library Screen
    "library_intro_ur.mp3": "تمام فیچرز اور مہارتوں کا نقشہ۔ تمام مشقیں آزمائیں اور جو چاہیں اپنی مرضی سے سیکھیں۔"
}

async def generate_all():
    print(f"Generating {len(AUDIO_SCRIPTS)} aligned Urdu audio files with voice {VOICE}...")
    for filename, text in AUDIO_SCRIPTS.items():
        filepath = os.path.join(OUTPUT_DIR, filename)
        print(f"  Synthesizing: {filename}...")
        try:
            communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
            await communicate.save(filepath)
        except Exception as e:
            print(f"  Error generating {filename}: {e}")
    print("All aligned Urdu audio files generated successfully!")

if __name__ == '__main__':
    asyncio.run(generate_all())
