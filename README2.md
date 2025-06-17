# PCG-Benchmark-Visualizer
This project is a viualization tool meant to help explain how the PCG Benchmark works in practice, and how it can easily be extended to entirely new generative problems in games. For this reason, the PokemonBattleProblem was defined, along with many customizability and visualization options to make it as detailed as possible for the user. 

## Installation and Setup

### Requirements
You will need Python (3.11+ recommended) with pip, and Node.js with npm. Make sure to install them before proceeding.

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

By exploring these sections, users can gain insights into how different generators perform on the Pokémon Battle Problem according to the PCG benchmark, understand the evaluation metrics, and see detailed simulations of the generated content.

# External resources
The following resources were used for the project:
- Generators from [`PCG Benchmark experiments`](https://github.com/amidos2006/benchmark_experiments/tree/main/generators): this code was directly imported from the original paper's experiment repository. It contains the code for the generators which were used in the paper. This was done to prevent additional overhead of reimplementig the generators since that wasn't the core of this project.
- [`MUI Material UI`](https://mui.com/material-ui/): this is a frontend library which was used to help making the frontend React layout easier to build. It has many built in components which were used for the frontend (most notably Box, Paper, Breadcrumbs, etc.)