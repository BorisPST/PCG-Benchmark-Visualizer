import pcg_benchmark
from pcg_benchmark.spaces import DictionarySpace
from .utils import GeneratorConfig, ProblemConfig
from pokemonbattle_problem.problem import PokemonBattleProblem
from generators.random import Generator as RandomGenerator
from generators.es import Generator as ESGenerator
from generators.ga import Generator as GAGenerator
from pcg_benchmark.probs import PROBLEMS
import random

# ENV = pcg_benchmark.make('pokemonbattle-v0')
ENV = pcg_benchmark.make('pokemonbattle-v0')
content_space: DictionarySpace = ENV.content_space
control_space: DictionarySpace = ENV.control_space

def random_sample(n: int, sample_control: bool):
    contents = []
    controls = []

    for _ in range(n):
        contents.append(content_space.sample())
        if sample_control:
            controls.append(control_space.sample())
        else:
            controls.append(None)

    return contents, controls

def update_problem(variant: str, settings: dict):
    """
    Updates the settings of an existing problem variant.
    """
    problem_settings = PROBLEMS[variant][1]
    for key, value in problem_settings.items():
        if key in settings:
            problem_settings[key] = settings[key]
    
    PROBLEMS[variant] = (PokemonBattleProblem, problem_settings)

def register_problem(config: ProblemConfig):
    """
    Registers a new custom problem variant
    """
    settings = {}

    if config.min_level is not None:
        settings["min_level"] = config.min_level
    if config.max_level is not None:
        settings["max_level"] = config.max_level
    if config.min_turns is not None:
        settings["min_turns"] = config.min_turns
    if config.max_turns is not None:
        settings["max_turns"] = config.max_turns
    if config.winner is not None:
        settings["winner"] = config.winner
    if config.surviving_hp_percentage is not None:
        settings["surviving_hp_percentage"] = config.surviving_hp_percentage
    if config.diversity is not None:
        settings["diversity"] = config.diversity
    
    if config.variant not in PROBLEMS:
        pcg_benchmark.register(config.variant, PokemonBattleProblem, settings)
    else:
        update_problem(config.variant, settings)

def serialize_content(content):
    """
    Serialize the content dictionary to a more readable format.
    """
    return {
        "player_pokemon": int(content["player_pokemon"]),
        "rival_pokemon": int(content["rival_pokemon"]),
        "player_level": int(content["player_level"]),
        "rival_level": int(content["rival_level"]),
        "rival_battle_strategy": int(content["rival_battle_strategy"]),
        "rng_seed": int(content["rng_seed"])
    }

def serialize_control(control):
    """
    Serialize the control dictionary to a more readable format.
    """
    return {
        "turns": int(control["turns"]),
        "rival_pokemon_type": int(control["rival_pokemon_type"]),
        "first_move_trainer": int(control["first_move_trainer"])
    }

def apply_generator(config: GeneratorConfig, env: pcg_benchmark.PCGEnv):
    match config.generator:
        case 0:
            gen = RandomGenerator(env)
            gen.reset(pop_size=config.population_size, fitness=config.fitness)
        case 1:
            gen = ESGenerator(env)
            gen.reset(mu_size=config.population_size, fitness=config.fitness)
        case 2:
            gen = GAGenerator(env)
            gen.reset(pop_size=config.population_size, fitness=config.fitness)
        case _:
            gen = RandomGenerator(env)
            gen.reset(pop_size=config.population_size, fitness=config.fitness)
    
    generations = []
    for _ in range(config.generations):
        gen.update()
        chromosomes = gen._chromosomes
        content = [c._content for c in chromosomes]
        control = [c._control for c in chromosomes]

        # Forcing rnadom seed to prevent optimizing for a specific seed
        for c in content:
            c["rng_seed"] = random.randint(0, 2**32 - 1)

        q, d, c, details, infos = env.evaluate(content, control)

        indices = random.sample(range(len(chromosomes)), min(10, len(chromosomes)))
        generation = {
            "q_score": q,
            "d_score": d,
            "c_score": c,
            "individuals": [
                {
                    "content": serialize_content(chromosomes[i]._content),
                    "control": serialize_control(chromosomes[i]._control),
                    "winner": infos[i]["winner"],
                    "surviving_hp_percentage": infos[i]["surviving_pokemon_hp_percentage"],
                    "quality": details["quality"][i],
                    "diversity": details["diversity"][i],
                    "controlability": details["controlability"][i],
                    "turns": infos[i]["turns"],
                }
                for i in indices
            ]
        }
        generations.append(generation)
    
    return generations