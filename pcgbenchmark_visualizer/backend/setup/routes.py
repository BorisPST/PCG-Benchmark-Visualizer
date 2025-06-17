import pcg_benchmark
from backend.setup.generator import random_sample, ENV
from .utils import Content, Control, Pair, GeneratorConfig, ProblemConfig, RequestParams, get_generator_name, SimulateBattleParams
from fastapi import APIRouter, Depends
from typing import List

from external_code.es import Generator
import pokemonbattle_problem
from pokemonbattle_problem.default_problems import ALL_VARIANTS
from pcg_benchmark import make
import pprint as pp
from .generator import apply_generator, register_problem
from .logger import save_generator_output, load_generation_info

router = APIRouter()

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
    render = env.render(contents)
    return {
        "quality": details["quality"][0],
        "controlability": details["controlability"][0],
        "info": info[0],
        "render": render[0],
    }

def get_field(obj, field):
    if isinstance(obj, dict):
        return obj.get(field, None)
    return getattr(obj, field, None)

@router.get("/problem_variants")
def get_problem_variants() -> List[ProblemConfig]:
    """
    Get the list of available problem variants.
    
    return: List of problem variant names.
    """
    variants = []
    for variant in ALL_VARIANTS:
        print(f"Registering problem variant: {variant[1]}")
        config = ProblemConfig(
            variant=variant[0],
            min_level=get_field(variant[1], "min_level"),
            max_level=get_field(variant[1], "max_level"),
            min_turns=get_field(variant[1], "min_turns"),
            max_turns=get_field(variant[1], "max_turns"),
            winner=get_field(variant[1], "winner"),
            surviving_hp_percentage=get_field(variant[1], "surviving_hp_percentage"),
            diversity=get_field(variant[1], "diversity"),
        )
        
        variants.append(config) 
    return variants