import React from "react";
import { type BattleSimulationData, type BattleInspectorData } from "../components/utils/type_utils";

export const BattleInspectorContext = React.createContext<BattleSimulationData>({
    data: {} as BattleInspectorData,
    render: []
});