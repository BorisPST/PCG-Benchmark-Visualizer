import pcg_benchmark
from backend.setup.generator import random_sample, ENV
from .utils import Content, Control, Pair, get_info
from fastapi import APIRouter, Depends
from typing import List

from generators.ga import Generator
import pokemonbattle_problem
from pcg_benchmark import make
import pprint as pp

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

@router.get("/run_generator")
def run_generator(steps: int = 10):
    env = pcg_benchmark.make('pokemonbattle-v1')
    gen = Generator(env)
    gen.reset(pop_size=100, fitness="fitness_quality_control")
    generations = []

    for i in range(steps):
        gen.update()
    
    chromosomes = gen._chromosomes
    content = [c._content for c in chromosomes]
    control = [c._control for c in chromosomes]
    q, d, c, details, info = env.evaluate(content, control)
    print(details)
    pp.pprint(info[0]["player_pokemon"]["name"])
    print(info[0]["player_pokemon"]["level"])
    pp.pprint(info[0]["rival_pokemon"]["name"])
    print(info[0]["rival_pokemon"]["level"])
    print(info[0]["turns"])
    return {
        "quality": q,
        "diversity": d,
        "controllability": c,
        # "details": details,
        # "info": info,
    }