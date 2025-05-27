import pcg_benchmark
from backend.setup.generator import random_sample, ENV
from .utils import Content, Control, Pair, get_info, GeneratorConfig, ProblemConfig, RequestParams, get_generator_name
from fastapi import APIRouter, Depends
from typing import List

from generators.es import Generator
import pokemonbattle_problem
from pcg_benchmark import make
import pprint as pp
from .generator import apply_generator
from .logger import save_generator_output

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
def run_generator(params: GeneratorConfig) -> dict:
    env = pcg_benchmark.make('pokemonbattle-v1')
    # gen = Generator(env)
    # gen.reset(mu_size=100, fitness="fitness_quality_control_diversity")
    # generations = []

    # for i in range(20):
    #     gen.update()
    
    # chromosomes = gen._chromosomes
    # content = [c._content for c in chromosomes]
    # control = [c._control for c in chromosomes]
    # q, d, c, details, info = env.evaluate(content, control)
    # # print(details)

    # percentages = [int(p["surviving_pokemon_hp_percentage"] * 100) for p in info[:10]]

    # pp.pprint(percentages)
    # return {
    #     "quality": q,
    #     "diversity": d,
    #     "controllability": c,
    #     # "details": details,
    #     # "info": info,
    # }
    res = apply_generator(params, env)
    save_generator_output(get_generator_name(params.generator), res)

    filtered_res = [
        {
            "q_score": gen["q_score"],
            "d_score": gen["d_score"],
            "c_score": gen["c_score"],
        } for gen in res
    ]
    return {
        "generations": filtered_res,
    }