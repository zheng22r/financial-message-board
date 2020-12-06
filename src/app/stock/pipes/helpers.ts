import { MS_PER_DAY } from "@progress/kendo-date-math";

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

export const rangeAndIntervalCompatible = (rangeDuration: number, intervalDuration: number) => {
    const intervalGreaterThanRange = intervalDuration > rangeDuration;

    const intervalTooSmallForRange = rangeDuration > (MS_PER_DAY * 3) && intervalDuration < (MS_PER_DAY / 24);

    return !intervalGreaterThanRange && !intervalTooSmallForRange;
};
