import re
from pathlib import Path
from gtts import gTTS
from app.core.config import AUDIO_DIR, MODEL_DIR

# Global variables for model and session
gpt2 = None
sess = None
model_name = MODEL_DIR.name
checkpoint_dir = str(MODEL_DIR.parent)

def load_model():
    global gpt2, sess
    if sess is None:
        try:
            try:
                import gpt_2_simple as gpt2
            except ImportError as exc:
                raise RuntimeError(
                    "GPT-2 dependencies are not installed. "
                    "Install Backend/app/model-requirements.txt and follow MODEL_SETUP.md."
                ) from exc
            if not MODEL_DIR.is_dir():
                raise FileNotFoundError(
                    f"Model directory not found: {MODEL_DIR}. "
                    "Follow MODEL_SETUP.md to install the optional checkpoint."
                )
            print("Loading model...")
            sess = gpt2.start_tf_sess()
            gpt2.load_gpt2(sess, run_name=model_name, checkpoint_dir=checkpoint_dir)
            print("Model loaded successfully.")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise

def create_mnemonic_song_audio(lyrics: str, filename: str) -> str:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    tts = gTTS(lyrics)
    safe_filename = re.sub(r"[^a-zA-Z0-9_-]+", "_", filename).strip("_") or "mnemonic_song"
    audio_path = Path(AUDIO_DIR) / f"{safe_filename}.mp3"
    tts.save(audio_path)
    return str(audio_path)

def generate_mnemonic_song(prompt: str) -> dict:
    # Hardcoded examples
    hardcoded_examples = {
        "planets": {
            "lyrics": "My Very Educated Mother Just Served Us Noodles. : Mercury,Venus, Earth, Mars, Jupiter Uranus, Neptune",
            "tune": "C C G G A A G, F F E E D D C"

        },
        "colors of the rainbow": {
            "lyrics": "Richard Of York Gave Battle In Vain.",
            "tune": "C C G G A A G, F F E E D D C"
        },
        "order of Math operations": {
            "lyrics": """
            Parentheses come first you see,
            Then exponents do decree,
            Multiplication and divide,
            Addition, subtraction side by side.
            Parentheses come first you see,
            Order of operations is the key.
            """,
            "tune": "C C G G A A G, F F E E D D C"
        },
        "verbs": {
            "lyrics": """
            Verbs show action, 
            verbs show doing, Running, jumping, eating, chewing
            To run, to jump, to eat, to chew, Verbs are doing words, it's true
            Verbs show action, verbs show doing, Running, jumping, eating, chewing.
            """,
            "tune":"C C G G A A G, F F E E D D C"

        }
    }

    if prompt.lower() in hardcoded_examples:
        example = hardcoded_examples[prompt.lower()]
        lyrics = example["lyrics"]
        tune = example.get("tune", "No tune available")
        
        # Create and save the audio file
        audio_file_path = create_mnemonic_song_audio(lyrics, prompt.lower().replace(' ', '_'))
        
        return {"lyrics": lyrics, "tune": tune, "audio": audio_file_path}

    # Generate lyrics if not a hardcoded example
    try:
        load_model()
    except Exception as e:
        return {"error": str(e)}

    print(f"Generating lyrics for prompt: {prompt}")
    try:
        lyrics_raw = gpt2.generate(
            sess,
            run_name=model_name,
            checkpoint_dir=checkpoint_dir,
            prefix=prompt,
            return_as_list=True,
            length=100,
            temperature=0.7,
            top_p=0.9
        )[0]
    except Exception as e:
        print(f"Error generating lyrics: {e}")
        return {"error": str(e)}

    print(f"Generated raw lyrics: {lyrics_raw}")

    # Extract relevant lyrics
    try:
        start_index = lyrics_raw.find(prompt)
        if start_index == -1:
            lyrics = "Could not generate relevant mnemonic song."
        else:
            lyrics_section = lyrics_raw[start_index:]
            lyrics = lyrics_section.strip().replace('\n', ' ')
    except Exception as e:
        print(f"Error processing lyrics: {e}")
        lyrics = "Could not process the lyrics correctly."

    # Create and save the audio file
    audio_file_path = create_mnemonic_song_audio(lyrics, prompt.lower().replace(' ', '_'))
    print(f"Processed lyrics: {lyrics}")

    return {
        "lyrics": lyrics,
        "audio": audio_file_path
    }
