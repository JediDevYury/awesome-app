export type InputManagerRef = {
  focus: () => void;
};

export type MaskItem = string | RegExp | [RegExp];

export type MaskArray = Array<MaskItem>;

export type Mask = MaskArray | ((value?: string) => MaskArray);
