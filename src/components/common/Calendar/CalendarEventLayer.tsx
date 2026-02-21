import { EventBarSegment } from "@/types/calendar";

interface CalendarEventLayerProps {
  segments: EventBarSegment[];
  eventRowCount: number;
}

const BAR_HEIGHT = 37;
const BAR_GAP = 3;
const CELL_PADDING = 12;
const DATE_BADGE_SIZE = 24;

const LAYER_TOP = CELL_PADDING + DATE_BADGE_SIZE + CELL_PADDING;

export default function CalendarEventLayer({
  segments,
  eventRowCount,
}: CalendarEventLayerProps) {
  if (eventRowCount === 0) return null;

  return (
    <div
      className="absolute left-0 right-0 pointer-events-none"
      style={{ top: LAYER_TOP }}
    >
      {segments.map((seg) => {
        const cellWidthPct = 100 / 7;

        // 시작 셀의 왼쪽 경계 + 패딩
        const leftPct = seg.startCol * cellWidthPct;
        // 끝 셀의 오른쪽 경계 - 패딩
        const rightPct = (7 - seg.endCol - 1) * cellWidthPct;

        const top = seg.rowIndex * (BAR_HEIGHT + BAR_GAP);

        return (
          <div
            key={`${seg.itemId}-${seg.startCol}`}
            className="absolute flex items-center pointer-events-auto"
            style={{
              left: `calc(${leftPct}% + ${CELL_PADDING}px)`,
              right: `calc(${rightPct}% + ${CELL_PADDING}px)`,
              top,
              height: BAR_HEIGHT,
              backgroundColor: seg.color,
              borderRadius: 96,
              paddingLeft: 18,
              paddingRight: 18,
            }}
          >
            <span
              className="truncate text-sm font-medium text-black"
              style={{ lineHeight: `${BAR_HEIGHT}px` }}
            >
              {seg.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}