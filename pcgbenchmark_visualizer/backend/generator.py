import pcg_benchmark
from pcg_benchmark.spaces import DictionarySpace

env = pcg_benchmark.make('pokemonbattle-v0')
content_space: DictionarySpace = env.content_space

def random_sample(n: int):
    res = []
    for _ in range(n):
        res.append(content_space.sample())
    return res