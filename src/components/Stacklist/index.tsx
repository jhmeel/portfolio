import { Stack, StackInfo } from "../../Types";
import React, { useCallback } from "react";
import "./style.scss";

interface StackListProps {
  stack: Stack[];
}

function StackList(props: StackListProps): React.ReactElement {
  const { stack } = props;

  const renderList = useCallback((stack) => {
    const { value, color } = StackInfo[stack];

    return (
      <span
        className="stack-list__item"
        style={{ background: color }}
        key={stack}
      >
        {value}
      </span>
    );
  }, []);

  return (
    <div className="stack-list">
      {React.Children.toArray(stack.map(renderList))}
    </div>
  );
}

export default StackList;
