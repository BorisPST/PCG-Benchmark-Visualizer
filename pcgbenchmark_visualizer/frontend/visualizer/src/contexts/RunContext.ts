import React from "react";

interface RunContextData {
    currentRun: number;
    runCompleted: boolean;
}

export const RunContext = React.createContext<RunContextData>({
    currentRun: 0,
    runCompleted: false,
});