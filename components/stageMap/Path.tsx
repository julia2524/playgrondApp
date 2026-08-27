import React from "react";

import { PathContainer, PathLine } from "../../styles/stageMapStyles";

interface PathProps {
  completed?: boolean;
}

export default function Path({ completed = false }: PathProps) {
  return (
    <PathContainer>
      <PathLine completed={completed} />
    </PathContainer>
  );
}
