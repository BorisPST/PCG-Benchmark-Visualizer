import pcg_benchmark
from backend.setup.generator import random_sample, ENV
from .utils import Content, Control, Pair, get_info, GeneratorConfig, ProblemConfig, RequestParams, get_generator_name, SimulateBattleParams
from fastapi import APIRouter, Depends
from typing import List

from generators.es import Generator
import pokemonbattle_problem
from pcg_benchmark import make
import pprint as pp
from .generator import apply_generator, register_problem
from .logger import save_generator_output, load_generation_info

router = APIRouter()

@router.get("/simulate")
def simulate(sample_size: int = 5, sample_with_control: bool = False) -> dict:
    """
    Simulate a pokemon battle using the provided content and control artifacts.
    
    @param content: The content parameters artifacts.
    @param control: The control parameters of the artifacts.
    
    return: Dictionary containing the results of the simulation.
    """

    contents, controls = random_sample(sample_size, sample_with_control)

    if not sample_with_control:
        controls = None

    q, d, c, details, *_ = ENV.evaluate(contents, controls)
    details = {k: v.tolist() if hasattr(v, "tolist") else v for k, v in details.items()}
    get_info(contents)

    return {
        "quality": q,
        "diversity": d,
        "controllability": c,
        "details": details,
        "info": get_info(contents),
        "render": ENV.render(contents),
    }

@router.post("/run_generator")
def run_generator(params: RequestParams) -> dict:

    register_problem(params.problem_config)
    env = pcg_benchmark.make(params.problem_config.variant)

    res = apply_generator(params.generator_config, env)
    save_generator_output(get_generator_name(params.generator_config.generator), res)

    filtered_res = [
        {
            "q_score": gen["q_score"],
            "d_score": gen["d_score"],
            "c_score": gen["c_score"],
        } for gen in res
    ]

    final_score = {
        "q_score": res[-1]["q_score"],
        "d_score": res[-1]["d_score"],
        "c_score": res[-1]["c_score"],
    }
    return {
        "final_score": final_score,
        "generations": filtered_res,
    }

@router.get("/generation")
def get_generation(generator: int, generation: int) -> dict:
    gen_name = get_generator_name(generator)
    generation = load_generation_info(gen_name, generation)

    if generation is None:
        return {"error": "Generation not found"}
    
    return generation

def to_native_content(content):
    # Convert Pydantic model or dict to a flat dict with Python ints
    if hasattr(content, 'dict'):
        content = content.dict()
    return {k: int(v) for k, v in content.items()}

@router.post("/simulate_battle")
def get_battle_info(params: SimulateBattleParams) -> dict:
    """
    Get the battle information.
    
    return: Dictionary containing the battle information.
    """
    env = pcg_benchmark.make(params.variant)

    native_content = to_native_content(params.content)
    native_control = to_native_content(params.control)
    
    contents = [native_content]
    controls = [native_control]
    _, _, _, details, info = env.evaluate(contents, controls)
    
    return {
        "quality": details["quality"][0],
        "controlability": details["controlability"][0],
        "info": info
    }