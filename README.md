# PCG-Benchmark-Visualizer
This project is a viualization tool meant to help explain how the PCG Benchmark works in practice, and how it can easily be extended to entirely new generative problems in games. For this reason, the PokemonBattleProblem was defined, along with many customizability and visualization options to make it as detailed as possible for the user. 

## Installation and Setup

### Requirements
You will need Python (3.12 recommended) with pip, and Node.js with npm. Make sure to install them before proceeding.

### Backend Setup
1.  **Navigate to the project root directory** in your terminal.
2.  **Install Python dependencies**:
    ```sh
    pip install -r requirements.txt
    ```
3.  **Navigate to the backend directory**:
    ```sh
    cd pcgbenchmark_visualizer
    ```
4.  **Run the backend server**
    ```sh
    uvicorn backend.app:app --reload --port 8000
    ```
    Keep this terminal window open!

### Frontend Setup

1.  **Open a new terminal window/tab.**
2.  **Navigate to the frontend visualizer directory**:
    ```sh
    cd pcgbenchmark_visualizer/frontend/visualizer
    ```
3.  **Install Node.js dependencies**:
    ```sh
    npm install
    ```
4.  **Run the frontend development server**:
    ```sh
    npm run dev
    ```
    This should automatically open a new tab in your browser. Keep this terminal window open!

Once both servers are running, you can access the visualizer at [http://localhost:5173](http://localhost:5173).

## Project Structure

The project is organized into the following main directories:

*   `pcgbenchmark_visualizer/`: The core application code.
    *   `backend/`: Contains the Python FastAPI backend.
        *   [`app.py`](pcgbenchmark_visualizer/backend/app.py): The main FastAPI application file defining API endpoints.
        *   `setup/`: Modules for request handling ([`routes.py`](pcgbenchmark_visualizer/backend/setup/routes.py)), data logging ([`logger.py`](pcgbenchmark_visualizer/backend/setup/logger.py)), and PCG initialization.
        *   `outputs/`: Default directory where JSON outputs from generator runs are stored (e.g., [`random.json`](pcgbenchmark_visualizer/backend/outputs/es.json)).
    *   `frontend/visualizer/`: Contains the React frontend application.
        *   `src/`: Source code for the visualizer.
            *   [`App.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/App.tsx): The main React application component managing tabs and global state.
            *   `components/`: Contains all React components for different UI sections like:
                *   [`Generators/`](pcgbenchmark_visualizer/frontend/visualizer/src/components/Generators/): Components for displaying generator settings ([`GeneratorSettings.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/Generators/GeneratorSettings/GeneratorSettings.tsx)), problem configurations ([`ProblemSettings.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/Generators/ProblemSettings/ProblemSettings.tsx)), and results ([`Results.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/Generators/Results.tsx)).
                *   [`BattleHub/`](pcgbenchmark_visualizer/frontend/visualizer/src/components/BattleHub/): Components for listing battles ([`BattleHub.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/BattleHub/BattleHub.tsx)) and inspecting individual battles ([`BattleInspector.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/BattleHub/BattleInspector/BattleInspector.tsx)) including the battle simulator ([`BattleSimulator.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/BattleHub/BattleInspector/BattleSimulator/BattleSimulator.tsx)) and overview sections.
                *   [`PokemonProblem/`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PokemonProblem/): Components explaining the Pokémon battle domain ([`PokemonProblem.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PokemonProblem/PokemonProblem.tsx)).
                *   [`PCGBenchmark/`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PCGBenchmark/): Components explaining the PCG Benchmark framework ([`PCGBenchmark.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PCGBenchmark/PCGBenchmark.tsx)).
                *   [`PredefinedVariants/`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PredefinedVariants/): Component displaying predefined problem variants ([`PredefinedVariants.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PredefinedVariants/PredefinedVariants.tsx)).
            *   `contexts/`: React contexts for managing shared state (e.g., [`ProblemConfigContext.ts`](pcgbenchmark_visualizer/frontend/visualizer/src/contexts/ProblemConfigContext.ts), [`BattleInspectorContext.ts`](pcgbenchmark_visualizer/frontend/visualizer/src/contexts/BattleInspectorContext.ts)).
            *   `utils/`: Utility functions, type definitions, and server request logic ([`server_requests.ts`](pcgbenchmark_visualizer/frontend/visualizer/src/components/utils/server_requests.ts)).
        *   [`index.html`](pcgbenchmark_visualizer/frontend/visualizer/index.html): Main HTML file for the frontend.
        *   [`package.json`](pcgbenchmark_visualizer/frontend/visualizer/package.json): Frontend project metadata and dependencies.
    *   `generators/`: This is EXTERNAL CODE imported for ease of implementation!  See [`generators/README.md`](pcgbenchmark_visualizer/generators/README.md).
    *   `pokemonbattle_problem/`: Python code defining the "Pokemon Battle Problem" including its logic, default configurations, and specific Pokémon mechanics.
        *   [`__init__.py`](pcgbenchmark_visualizer/pokemonbattle_problem/__init__.py): Registers the `PokemonBattleProblem` and its predefined variants (e.g., `pokemonbattle-v0`, `pokemonbattle-long-v0`) with the `pcg_benchmark` library, making them accessible via `pcg_benchmark.make()`.
        *   [`problem.py`](pcgbenchmark_visualizer/pokemonbattle_problem/problem.py): Contains the core `PokemonBattleProblem` class, which inherits from `pcg_benchmark.Problem`. This class defines:
            *   Content Space: The parameters that define a Pokémon battle (e.g., player/rival Pokémon indices, levels, RNG seed).
            *   Control Space: The target parameters for controllability (e.g., desired number of turns, rival Pokémon type).
            *   `info()`: Simulates a battle based on input content and returns detailed information (log, winner, turns, Pokémon stats, etc.).
            *   `quality()`, `diversity()`, `controlability()`: Functions to evaluate the generated battles based on the problem's objectives and the PCG Benchmark metrics.
            *   `render()`: Provides a textual representation of the battle log.
            *   `get_battle_data()`: Helper to instantiate Pokémon objects and run the battle simulation.
        *   [`default_problems.py`](pcgbenchmark_visualizer/pokemonbattle_problem/default_problems.py): Defines dictionaries for various predefined problem variants (e.g., `DEFAULT_VARIANT`, `LONG_BATTLE_VARIANT`, `TO_THE_WIRE_VARIANT`), specifying their unique parameter configurations.
        *   `pokemon_logic/`: This sub-directory encapsulates all the logic related to Pokémon mechanics and battle simulation.
            *   [`__init__.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/__init__.py): Makes the `pokemon_logic` package available.
            *   [`pokemon_battle_logic.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/pokemon_battle_logic.py): Implements the core battle simulation loop (`simulate_battle`). It handles turn order, move execution (`execute_move`), and determines the battle outcome. Also includes `get_print_battle_log` for formatting the battle log.
            *   `data/`: Contains the raw data for Pokémon and their moves.
                *   [`pokemon.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/data/pokemon.py): Defines `PokemonBlueprint` objects for each available Pokémon (Bulbasaur, Charmander, Squirtle, Pikachu). Each blueprint includes base stats, types, and a move pool learned at different levels. It also defines `POKEMON` dictionary and `POKEMON_COUNT`.
                *   [`moves.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/data/moves.py): Defines `PokemonMove` namedtuples for all available moves, specifying their name, power, accuracy, category (Physical, Special), and type. It also defines the `MOVES` dictionary.
            *   `utils/`: Contains utility classes and functions supporting the battle logic.
                *   [`pokemon_utils.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/utils/pokemon_utils.py): Defines the `Pokemon` class, which represents an instance of a Pokémon in a battle. It handles stat calculation based on level (`set_stats`, `calc_hp_stat`, `calc_other_stat`), move learning (`set_moves`), taking damage, and determining the strongest move. The `PokemonBlueprint` namedtuple is also defined here.
                *   [`battle_utils.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/utils/battle_utils.py): Provides functions for crucial battle calculations like damage (`calculate_damage`), determining offensive/defensive stats for a move (`get_offensive_stat_value`, `get_defensive_stat_value`), move effectiveness multipliers (`get_move_effectiveness_multiplier`), and STAB (Same Type Attack Bonus) multipliers (`get_stab_multiplier`). It also includes logic for determining turn order (`get_attacker_and_defender`).
                *   [`move_utils.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/utils/move_utils.py): Defines the `PokemonMove` namedtuple structure and the `MoveCategory` enum (PHYSICAL, SPECIAL, STATUS).
                *   [`type_utils.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/utils/type_utils.py): Defines the `PokemonType` enum and the `TYPE_CHART`, which is a dictionary mapping attacker/defender type combinations to damage multipliers, determining type effectiveness.
                *   [`stats_utils.py`](pcgbenchmark_visualizer/pokemonbattle_problem/pokemon_logic/utils/stats_utils.py): Defines the `PokemonStats` namedtuple for holding a Pokémon's base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed).
        *   [`playground.py`](pcgbenchmark_visualizer/pokemonbattle_problem/playground.py): A script for testing and experimenting with the `PokemonBattleProblem` directly.
*   [`requirements.txt`](requirements.txt): Python dependencies for the backend.

## Usage

Once the backend and frontend servers are running, navigate to [http://localhost:5173](http://localhost:5173).

The application is organized into several tabs:

1.  **Results**: This is the main interaction tab.
    *   **Generator Settings**: Configure parameters for the PCG algorithms (Random, ES, GA) such as population size and fitness objectives.
    *   **Problem Settings**: Select from predefined problem variants (e.g., `pokemonbattle-v0`, `pokemonbattle-long-v0`) or define a new custom variant by specifying parameters like `min_level`, `max_turns`, `winner`, etc.
    *   **Run Generators**: Click the "Run Generators" button to execute the configured algorithms against the selected problem variant.
    *   **Generator Overview**: After a run, this section displays the overall Quality, Controllability, and Diversity (QCD) scores for each generator.
    *   **Drill-down**:
        *   Click on a generator to view a list of its generations, each with its QCD scores.
        *   Click on a specific generation to load a sample of 10 random individuals (generated battles) into the **Battle Hub** section below.
    *   **Battle Hub**:
        *   Displays a sortable list of the selected generation's battles, showing key details like Pokémon involved, levels, winner, turns, and individual QCD scores.
        *   Click on any battle in the list to open the **Battle Inspector**.

2.  **Battle Inspector** (appears when a battle is selected from the Battle Hub):
    *   **Battle Simulator**:
        *   Provides an animated, turn-by-turn replay of the selected Pokémon battle.
        *   Shows Pokémon sprites, health bars, and a dynamic battle log describing each action.
        *   Controls allow pausing, playing, and stepping through turns.
    *   **Battle Overview**:
        *   **Pokémon Details**: Shows the stats, types, and moves for both the player's and rival's Pokémon.
        *   **Problem Config**: Displays the target parameters for the problem variant this battle was generated for.
        *   **Control Sample**: Shows the specific control parameters (e.g., target turns, rival type) sampled for this particular battle.
        *   **Battle Outcome**: Summarizes the actual results of the battle (e.g., winner, actual turns, surviving HP%).
        *   **Scores**: Displays the calculated Quality, Controllability, and Diversity scores for this individual battle.
        *   **QCD Calculations**: Provides a detailed breakdown of how each component of the Q, C, and D scores was calculated, showing the contribution of different reward functions.

3.  **About Pokemon**:
    *   Explains the fundamental concepts of Pokémon battles as implemented in this project, including turn mechanics, Pokémon stats, moves, and the type effectiveness chart. This is from the [`PokemonLogicSection.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PokemonProblem/SectionContent/PokemonLogicSection.tsx) component.

4.  **Simplifications**:
    *   Details the simplifications made to the standard Pokémon game mechanics to make the problem tractable for PCG, such as 1v1 battles and simplified battle strategies. See [`Simplifications.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/Simplifications/Simplifications.tsx).

5.  **PCG Benchmark**:
    *   Provides an overview of the PCG Benchmark framework, explaining concepts like Content Space, Control Space, Info Function, QCD Functions, and the Render Function, and how they apply to the Pokémon Battle Problem. See [`PCGBenchmark.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PCGBenchmark/PCGBenchmark.tsx).

6.  **Predefined Variants**:
    *   Lists and describes the predefined problem variants available for experimentation, along with their specific parameter configurations. This is the content from [`PredefinedVariants.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/PredefinedVariants/PredefinedVariants.tsx).

7.  **Credits**:
    *   Acknowledges the sources and tools used in the development of this project. See [`Credits.tsx`](pcgbenchmark_visualizer/frontend/visualizer/src/components/Credits/Credits.tsx).

By exploring these sections, users can gain insights into how different PCG algorithms perform on the Pokémon Battle Problem, understand the evaluation metrics, and see detailed simulations of the generated content.

## Acknowledgements
This project centers around the [`PCG Benchmark`](https://dl.acm.org/doi/full/10.1145/3723498.3723794), as the goal is to help visualize it and explain the concepts it introduces. Thus a special thanks goes to Ahmed Khalifa et al. for their contributions.
