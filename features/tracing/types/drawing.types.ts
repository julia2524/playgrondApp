export interface DrawingPoint {
  x: number;
  y: number;
}

export type DrawingStrokeData = DrawingPoint[];

export interface DrawingStrokeEndMeta {
  /** 시스템에 의한 터치 취소(Terminate) 여부 */
  wasTerminated: boolean;
  /** 터치 시작 후 실제 이동이 있었는지 (별 차감 기준) */
  hadMovement: boolean;
}

export interface DrawingGestureOptions {
  /**
   * 손가락을 정상적으로 뗐을 때 (또는 기존 호환용)
   * 현재 코드에서는 모든 완료된 Stroke를 전달하는 용도로 사용됨.
   */
  onStrokeComplete?: (stroke: DrawingStrokeData) => void;

  /**
   * Stroke 종료 시 메타 정보와 함께 전달 (정상 해제 / 시스템 취소 구분)
   */
  onStrokeEnd?: (stroke: DrawingStrokeData, meta: DrawingStrokeEndMeta) => void;

  /**
   * 시스템에 의한 터치 취소 시 호출 (실패로 처리하지 않음)
   */
  onStrokeCancel?: () => void;

  /**
   * 손가락이 닿거나 움직일 때마다 유효한 좌표를 전달한다.
   * 시각 효과(파티클 등) 전용이며 그리기/판정 로직에는 관여하지 않는다.
   */
  onTouchPoint?: (point: DrawingPoint) => void;
}
