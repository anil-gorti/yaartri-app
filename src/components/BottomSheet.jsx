import { useRef, useState, useCallback, useEffect } from 'react';

const SNAP_POINTS = { collapsed: 0.12, half: 0.5, full: 0.92 };

export default function BottomSheet({ children, peekContent }) {
  const sheetRef = useRef(null);
  const dragRef = useRef({ startY: 0, startHeight: 0, dragging: false });
  const [heightFraction, setHeightFraction] = useState(SNAP_POINTS.collapsed);
  const [isDragging, setIsDragging] = useState(false);

  const snapTo = useCallback((fraction) => {
    const snaps = Object.values(SNAP_POINTS);
    const closest = snaps.reduce((prev, curr) =>
      Math.abs(curr - fraction) < Math.abs(prev - fraction) ? curr : prev
    );
    setHeightFraction(closest);
  }, []);

  const onTouchStart = useCallback((e) => {
    dragRef.current = {
      startY: e.touches[0].clientY,
      startHeight: heightFraction,
      dragging: true
    };
    setIsDragging(true);
  }, [heightFraction]);

  const onTouchMove = useCallback((e) => {
    if (!dragRef.current.dragging) return;
    const deltaY = dragRef.current.startY - e.touches[0].clientY;
    const deltaFraction = deltaY / window.innerHeight;
    const newFraction = Math.max(0.08, Math.min(0.95, dragRef.current.startHeight + deltaFraction));
    setHeightFraction(newFraction);
  }, []);

  const onTouchEnd = useCallback(() => {
    dragRef.current.dragging = false;
    setIsDragging(false);
    snapTo(heightFraction);
  }, [heightFraction, snapTo]);

  const onHandleClick = useCallback(() => {
    if (heightFraction <= SNAP_POINTS.collapsed + 0.05) {
      setHeightFraction(SNAP_POINTS.half);
    } else if (heightFraction >= SNAP_POINTS.full - 0.05) {
      setHeightFraction(SNAP_POINTS.half);
    } else {
      setHeightFraction(SNAP_POINTS.collapsed);
    }
  }, [heightFraction]);

  useEffect(() => {
    const preventScroll = (e) => {
      if (isDragging) e.preventDefault();
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [isDragging]);

  const isExpanded = heightFraction > SNAP_POINTS.collapsed + 0.05;

  return (
    <div
      ref={sheetRef}
      className={`bottom-sheet ${isDragging ? 'bottom-sheet--dragging' : ''}`}
      style={{
        height: `${heightFraction * 100}%`,
        transition: isDragging ? 'none' : 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        className="sheet-handle-zone"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onHandleClick}
        role="button"
        tabIndex={0}
        aria-label="Toggle panel"
      >
        <div className="sheet-handle" />
      </div>

      {!isExpanded && peekContent && (
        <div className="sheet-peek fade-in">
          {peekContent}
        </div>
      )}

      <div
        className="sheet-content"
        style={{ opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
}
