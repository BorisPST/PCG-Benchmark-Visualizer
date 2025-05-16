from pcg_benchmark import list, make
import pprint

# Notes: To run and play with this code, do the following:
#   - cd to the parent directory of this file (pcgbenchmark_visualizer folder)
#   - run `python -m pokemonbattle_problem.playground`

env = make('pokemonbattle-v0')
contents = [env.content_space.sample()]
q, d, c, details, *_ = env.evaluate(contents)
print(q)
print(d)
print(c)
print(details)
print("---------------------------------------------------------------\n")
pprint.pprint(env.render(contents))