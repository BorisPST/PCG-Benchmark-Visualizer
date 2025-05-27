import pcg_benchmark
from pcg_benchmark.spaces import DictionarySpace

# ENV = pcg_benchmark.make('pokemonbattle-v0')
ENV = pcg_benchmark.make('pokemonbattle-v1')
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