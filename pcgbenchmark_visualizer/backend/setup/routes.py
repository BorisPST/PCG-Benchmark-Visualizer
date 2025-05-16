import pcg_benchmark

from backend.setup.generator import random_sample, ENV
from .utils import Content, Control, Pair, get_info
from fastapi import APIRouter, Depends
from typing import List

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
