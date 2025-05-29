import BulbasaurBack from "../../assets/bulbasaur_back.png"
import BulbasaurFront from "../../assets/bulbasaur_front.png"
import BulbasaurIcon from "../../assets/bulbasaur_icon.png"
import CharmanderBack from "../../assets/charmander_back.png"
import CharmanderFront from "../../assets/charmander_front.png"
import CharmanderIcon from "../../assets/charmander_icon.png"
import SquirtleBack from "../../assets/squirtle_back.png"
import SquirtleFront from "../../assets/squirtle_front.png"
import SquirtleIcon from "../../assets/squirtle_icon.png"
import CharmanderAnimated from "../../assets/charmander_icon_animated.png"
import BulbasaurAnimated from "../../assets/bulbasaur_icon_animated.png"
import SquirtleAnimated from "../../assets/squirtle_icon_animated.png"
import PikachuFront from "../../assets/pikachu_front.png"
import PikachuBack from "../../assets/pikachu_back.png"
import PikachuIcon from "../../assets/pikachu_icon.png"
import PikachuAnimated from "../../assets/pikachu_icon_animated.png"

import { type PokemonSprites } from "./type_utils"

export const sprites: PokemonSprites[] = [
    {
        name: "Bulbasaur",
        front: BulbasaurFront,
        back: BulbasaurBack,
        icon: BulbasaurIcon,
        animated_icon: BulbasaurAnimated,
    },
    {
        name: "Charmander",
        front: CharmanderFront,
        back: CharmanderBack,
        icon: CharmanderIcon,
        animated_icon: CharmanderAnimated,
    },
    {
        name: "Squirtle",
        front: SquirtleFront,
        back: SquirtleBack,
        icon: SquirtleIcon,
        animated_icon: SquirtleAnimated,
    },
    {
        name: "Pikachu",
        front: PikachuFront,
        back: PikachuBack,
        icon: PikachuIcon,
        animated_icon: PikachuAnimated,
    },
]