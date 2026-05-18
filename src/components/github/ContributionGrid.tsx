import React, { useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ContributionDay, ContributionWeek } from './types'
import { buildMonthLabels, WEEKDAY_LABELS, levelToHex, formatDate } from './utils'

interface ContributionGridProps {
  weeks: ContributionWeek[]
}

interface HoveredCell {
  day: ContributionDay
  rect: DOMRect
}

const CELL = 12
const GAP = 8

const ContributionGrid: React.FC<ContributionGridProps> = ({ weeks }) => {
  const [hovered, setHovered] = useState<HoveredCell | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const monthLabels = buildMonthLabels(weeks)

  const handleMouseEnter = useCallback(
    (day: ContributionDay, e: React.MouseEvent<HTMLButtonElement>) => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
      setHovered({ day, rect: e.currentTarget.getBoundingClientRect() })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHovered(null), 80)
  }, [])

  const TOOLTIP_W = 190
  const TOOLTIP_H = 58
  const GAP_TT = 10

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 0, minWidth: 'max-content' }}>

        {/* Month labels */}
        <div style={{ display: 'flex', marginLeft: 32, marginBottom: 8, position: 'relative', height: 16 }}>
          {monthLabels.map(({ label, weekIndex }) => (
            <span
              key={`${label}-${weekIndex}`}
              className="select-none absolute whitespace-nowrap"
              style={{
                left: weekIndex * (CELL + GAP),
                fontSize: 10,
                color: 'rgba(255,255,255,0.28)',
                fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid body */}
        <div style={{ display: 'flex', gap: 0 }}>
          {/* Weekday labels */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: `repeat(7, ${CELL}px)`,
              gap: GAP,
              marginRight: 8,
              width: 24,
              flexShrink: 0,
            }}
          >
            {Array.from({ length: 7 }, (_, row) => {
              const wd = WEEKDAY_LABELS.find((w) => w.row === row)
              return (
                <span
                  key={row}
                  className="flex items-center justify-end select-none"
                  style={{
                    height: CELL,
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.22)',
                    fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {wd?.label ?? ''}
                </span>
              )
            })}
          </div>

          {/* Cell columns */}
          <div style={{ display: 'flex', gap: GAP }}>
            {weeks.map((week, wi) => (
              <div
                key={wi}
                style={{ display: 'grid', gridTemplateRows: `repeat(7, ${CELL}px)`, gap: GAP }}
              >
                {week.contributionDays.map((day) => (
                  <button
                    key={day.date}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={`${day.date}: ${day.count} contributions`}
                    style={{
                      width: CELL,
                      height: CELL,
                      gridRow: day.weekday + 1,
                      borderRadius: 2,
                      border: 'none',
                      padding: 0,
                      cursor: 'default',
                      backgroundColor: levelToHex(day.level),
                      transition: 'opacity 0.12s ease, transform 0.12s ease, background-color 0.12s ease',
                    }}
                    className="hover:opacity-90 hover:scale-125"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip portal */}
      {hovered && createPortal(
        <div
          style={{
            position: 'fixed',
            left: Math.max(8, hovered.rect.left + hovered.rect.width / 2 - TOOLTIP_W / 2),
            top: hovered.rect.top - TOOLTIP_H - GAP_TT,
            width: TOOLTIP_W,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgb(20,20,20)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '8px 12px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: levelToHex(hovered.day.level) }}
              />
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>
                {hovered.day.count === 0
                  ? 'No contributions'
                  : hovered.day.count === 1
                  ? '1 contribution'
                  : `${hovered.day.count} contributions`}
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, marginTop: 3, paddingLeft: 16 }}>
              {formatDate(hovered.day.date)}
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: -5,
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgb(20,20,20)',
            }}
          />
        </div>,
        document.body
      )}
    </div>
  )
}

export default ContributionGrid
