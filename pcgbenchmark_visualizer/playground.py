from pcg_benchmark import list, make
import pokemonbattle_problem
import pprint

env = make('pokemonbattle-v0')
contents = [env.content_space.sample()]
q, d, c, details, *_ = env.evaluate(contents)
print(q)
print(d)
print(c)
print(details)
print("---------------------------------------------------------------\n")
pprint.pprint(env.render(contents))