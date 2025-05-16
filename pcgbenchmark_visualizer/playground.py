from pcg_benchmark import list, make
import pokemonbattle_problem
import pprint

env = make('pokemonbattle-v0')
contents = [env.content_space.sample()]
q, d, *_ = env.evaluate(contents)
print(q)
print(d)
pprint.pprint(env.info(contents))
pprint.pprint(env.render(contents))