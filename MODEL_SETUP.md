# Optional model setup

The fine-tuned GPT-2 checkpoint is intentionally not stored in Git because it is approximately 475 MB. The application can still run the hardcoded demonstration topics without it. Arbitrary topics require the checkpoint.

## Install the checkpoint

Install the model-only Python dependencies first. TensorFlow 1.15 is an old dependency, so use the Python version supported by that stack rather than adding it to the lightweight demo environment.

```powershell
pip install -r Backend/app/model-requirements.txt
```

Place the `mnemonic_songs_finetune` directory at:

```text
Backend/app/mnemonic_songs_finetune/
```

It should contain the GPT-2 files, including:

- `checkpoint`
- `model-1000.data-00000-of-00001`
- `model-1000.index`
- `model-1000.meta`
- `encoder.json`
- `vocab.bpe`
- `hparams.json`

The directory is ignored by Git. Keep the model in private storage or download it separately when setting up the application.

To use a different location, set `MODEL_DIR` in the root `.env` file.

## Compatibility note

The original model was trained for the TensorFlow 1.x / `gpt-2-simple` stack. Use the Python and TensorFlow versions supported by that stack when enabling model generation. The hardcoded demo topics do not load TensorFlow until an arbitrary topic is requested.
