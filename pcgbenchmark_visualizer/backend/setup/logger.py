import os
import json

def save_generator_output(generator: str, output: dict, path: str = "backend/outputs"):
    os.makedirs(path, exist_ok=True)
    file_path = os.path.join(path, f"{generator}.json")
    with open(file_path, 'w') as f:
        json.dump(output, f, indent=2)

def load_generation_info(generator: str, generation: int, path: str = "backend/outputs") -> dict:
    file_path = os.path.join(path, f"{generator}.json")
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    if generation < 0 or generation >= len(data):
        raise IndexError(f"Generation {generation} out of range for generator {generator}.")
    
    return data[generation]