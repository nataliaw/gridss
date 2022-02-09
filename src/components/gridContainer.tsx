import { css, cx } from "emotion";
import React from "react";
import { Breakpoints } from "./grid"
import { spacing } from "./spacing";

const autoRows = (minRowHeight = "20px") => `minmax(${minRowHeight}, auto)`;

const frGetter = (value?: string | number) =>
  typeof value === "number" ? `repeat(${value}, 1fr)` : value;

const formatAreas = (areas: string[]) => areas.map((area: string) => `"${area}"`).join(" ");

type Grid = {
  columns?: string | number,
  gap?: string,
  columnGap?: string,
  rowGap?: string,
  height?: string,
  minRowHeight?: string,
  flow?: string,
  rows?: string | number,
  areas?: string[],
  justifyContent?: string,
  alignContent?: string,
  autoRows?: string,
  maxWidth?: string,
  customCss?: string
}

export interface GridTypes extends Grid {
  as?: 'ul' | string,
  children: React.ReactNode,
};

type GridProps = GridTypes & { mobile?: Grid, tablet?: Grid };

const defaultGrid = {
  gap: "40px",
  height: "auto",
  flow: "row",
  columns: 12,
  maxWidth: "1312px"
}

const defaultGridTablet = {
  gap: "30px"
}

const defaultGridMobile = {
  gap: "20px"
}

const GridGenerator = (props: Grid) => css`
  margin: 0 auto;
  padding: 0 ${spacing.s};
  list-style: none;
  display: grid;
  max-width: ${props.maxWidth};
  height: ${props.height};
  grid-auto-flow: ${props.flow};
  grid-auto-rows: ${autoRows(props.minRowHeight)};
  ${props.rows && css`grid-template-rows: ${frGetter(props.rows)};`};
  grid-template-columns: ${frGetter(props.columns)};
  grid-gap: ${props.gap};
  ${props.columnGap && `column-gap: ${props.columnGap}`};
  ${props.rowGap && `row-gap: ${props.rowGap}`};
  ${props.areas && `grid-template-areas: ${formatAreas(props.areas)}`};
  ${props.justifyContent && `justify-content: ${props.justifyContent}`};
  ${props.alignContent && `align-content: ${props.alignContent}`};
  ${props.customCss}
`

const GridCSS = (props: GridProps): string => {
  const { mobile, tablet, ...nProps } = props;

  const mobileCSS = mobile && css`@media screen and (${Breakpoints.mobile}) {
    ${GridGenerator(Object.assign({}, defaultGridMobile, mobile))}
  }`
  const tabletCSS = tablet && css`@media screen and (${Breakpoints.tablet}) {
    ${GridGenerator(Object.assign({}, defaultGridTablet, tablet))}
  }`

  return cx(GridGenerator(Object.assign({}, defaultGrid, nProps)), tabletCSS, mobileCSS)
}

const main: React.FC<GridProps> = (props:any) => {
  const GridTag = props.as || 'div';
  return (
    //@ts-ignore Any html tag should have Intrinsic react atttributs
    <GridTag className={GridCSS(props)} >{props.children} </GridTag>)
};
export default main;