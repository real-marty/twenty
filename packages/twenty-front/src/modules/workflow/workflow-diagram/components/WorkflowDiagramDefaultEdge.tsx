import { useTheme } from '@emotion/react';
import { BaseEdge, EdgeProps, getStraightPath } from '@xyflow/react';
import { CREATE_STEP_NODE_WIDTH } from '@/workflow/workflow-diagram/constants/CreateStepNodeWidth';
import { VERTICAL_DISTANCE_BETWEEN_TWO_NODES } from '@/workflow/workflow-diagram/constants/VerticalDistanceBetweenTwoNodes';

type WorkflowDiagramDefaultEdgeProps = EdgeProps;

export const WorkflowDiagramDefaultEdge = ({
  sourceY,
  targetY,
  markerStart,
  markerEnd,
}: WorkflowDiagramDefaultEdgeProps) => {
  const theme = useTheme();

  const [edgePath] = getStraightPath({
    sourceX: CREATE_STEP_NODE_WIDTH,
    sourceY,
    targetX: CREATE_STEP_NODE_WIDTH,
    targetY,
  });

  return (
    <>
      <BaseEdge
        markerStart={markerStart}
        markerEnd={markerEnd}
        path={edgePath}
        style={{ stroke: theme.border.color.strong }}
      />
      <foreignObject
        width={40}
        height={30}
        x={50}
        y={(VERTICAL_DISTANCE_BETWEEN_TWO_NODES + 30) / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <button
          onClick={() => {}}
          style={{ width: '100%', height: '100%', fontSize: 10 }}
        >
          +
        </button>
      </foreignObject>
    </>
  );
};
