import { getDate, addDays, MS_PER_DAY } from "@progress/kendo-date-math";
import { SelectionRange } from "@progress/kendo-angular-dateinputs";

export const formatCurrency = (value: number): any => {
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(3) + 'B';
    }

    if (value >= 1000000) {
        return (value / 1000000).toFixed(3) + 'M';
    }

    if (value >= 1000) {
        return (value / 1000).toFixed(3) + 'K';
    }

    return value;
};

export const dateInRange = (candidate: Date, min: Date, max: Date): Date => {
    if (!candidate) {
        return candidate;
    }

    if (min && candidate < min) {
        return min;
    }

    if (max && candidate > max) {
        return max;
    }

    return candidate;
};

export const isDateInRange = (candidate: Date, min: Date, max: Date): boolean => (
    !candidate || !((min && min > candidate) || (max && max < candidate))
);

export const normalizeSelectionRange = (start: Date, end: Date, min: Date, max: Date): SelectionRange => {
    if (!(start && end && isDateInRange(start, min, max) && isDateInRange(end, min, max))) {
        return { start: null, end: null };
    }

    const normalizedStart = getDate(start);
    const normalizedEnd = addDays(end, 1);

    return {
        start: dateInRange(normalizedStart, min, max),
        end: dateInRange(normalizedEnd, min, max)
    };
};

export const rangeAndIntervalCompatible = (rangeDuration: number, intervalDuration: number) => {
    const intervalGreaterThanRange = intervalDuration > rangeDuration;

    const intervalTooSmallForRange = rangeDuration > (MS_PER_DAY * 3) && intervalDuration < (MS_PER_DAY / 24);

    return !intervalGreaterThanRange && !intervalTooSmallForRange;
};
