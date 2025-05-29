import React from "react";

interface RunContextData {
    currentRun: number;
    setCurrentRun: (run: number) => void;
    runCompleted: boolean;
    setRunCompleted: (completed: boolean) => void;
}

export const RunContext = React.createContext<RunContextData>({
    currentRun: 0,
    setCurrentRun: (run: number) => {
        console.log("RunContext: setCurrentRun called with " + run);
    },
    runCompleted: false,
    setRunCompleted: (completed: boolean) => {
        console.log("RunContext: setRunCompleted called with " + completed);
    }
});