import { BaseUnit } from "@progress/kendo-angular-charts";

export interface Interval {
  unit: BaseUnit;
  step: number;
}

export const IntervalUnitsMap = {
  minutes: 1,
  hours: 60,
  days: 1440,
  weeks: 10080
};
