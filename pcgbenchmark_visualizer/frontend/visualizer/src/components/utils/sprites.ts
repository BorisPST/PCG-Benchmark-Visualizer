import BulbasaurBack from "../../assets/bulbasaur_back.png"
import BulbasaurFront from "../../assets/bulbasaur_front.png"
import BulbasaurIcon from "../../assets/bulbasaur_icon.png"
import CharmanderBack from "../../assets/charmander_back.png"
import CharmanderFront from "../../assets/charmander_front.png"
import CharmanderIcon from "../../assets/charmander_icon.png"
import SquirtleBack from "../../assets/squirtle_back.png"
import SquirtleFront from "../../assets/squirtle_front.png"
import SquirtleIcon from "../../assets/squirtle_icon.png"

import { type PokemonSprites } from "./type_utils"

export const sprites: PokemonSprites[] = [
    {
        name: "Bulbasaur",
        front: BulbasaurFront,
        back: BulbasaurBack,
        icon: BulbasaurIcon,
    },
    {
        name: "Charmander",
        front: CharmanderFront,
        back: CharmanderBack,
        icon: CharmanderIcon,
    },
    {
        name: "Squirtle",
        front: SquirtleFront,
        back: SquirtleBack,
        icon: SquirtleIcon,
    },
]