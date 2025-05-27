import os
import json

def save_generator_output(generator: str, output: dict, path: str = "backend/outputs"):
    os.makedirs(path, exist_ok=True)
    file_path = os.path.join(path, f"{generator}.json")
    with open(file_path, 'w') as f:
        json.dump(output, f, indent=2)