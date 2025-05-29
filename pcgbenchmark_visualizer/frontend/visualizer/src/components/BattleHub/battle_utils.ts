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

export function getColorForType(type: number): string {
    switch (type) {
        case 0: return "#A2A4A2"; // Normal
        case 1: return "#78C850"; // Grass
        case 2: return "#F08030"; // Fire
        case 3: return "#6890F0"; // Water
        case 4: return "#F8D030"; // Electric
        case 5: return "#A040A0"; // Poison
        case 6: return "#705848"; // Dark
        default: return "#888888";
    }
}

export function getColorForPokemonType(type: string): string {
    switch (type) {
        case "NORMAL": return "#A2A4A2";
        case "GRASS": return "#78C850";
        case "FIRE": return "#F08030";
        case "WATER": return "#6890F0";
        case "ELECTRIC": return "#F8D030";
        case "POISON": return "#A040A0";
        case "DARK": return "#705848";
        default: return "#888888";
    }
}