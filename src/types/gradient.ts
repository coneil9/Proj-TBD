export type GradientType = 'linear' | 'radial';

export type ColorStop = {
  id: string; // stable key for ordering
  color: string; // hex value like #ff6600
  position: number; // 0-100 inclusive
};

export type GradientState = {
  type: GradientType;
  angle: number; // 0-360, only used for linear
  stops: ColorStop[];
};
