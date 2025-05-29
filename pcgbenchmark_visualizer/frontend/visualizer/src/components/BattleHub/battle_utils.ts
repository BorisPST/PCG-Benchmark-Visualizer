export function getPokemonFromId(pokemonId: number): string {
    switch (pokemonId) {
        case 0:
            return "Bulbasaur";
        case 1:
            return "Charmander";
        case 2:
            return "Squirtle";
        case 3:
            return "Pikachu";
        default:
            return "Unknown Pokemon";
    }
}