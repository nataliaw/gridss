import { css, cx } from "emotion"
import React from "react";
import { Breakpoints } from "./grid"

export interface Cell {
  className?: string,
  width?: number,
  height?: number,
  top?: number | string,
  left?: number | string,
  middle?: boolean,
  center?: boolean,
  area?: string,
  customCss?: string
};

export interface CellTypes extends Cell {
  as?: 'li' | string,
  children: React.ReactNode,
};

type CellProps = CellTypes & { mobile?: Cell, tablet?: Cell };

const defaultCell = {
  gap: "40px",
  height: 1,
  width: 1
}

const defaultCellTablet = {
  gap: "30px",
  height: 1,
  width: 1
}

const defaultCellMobile = {
  gap: "20px",
  height: 1,
  width: 1
}

const CellGenerator = (props: Cell) => css`
	margin: 0;
	padding: 0;
	list-style: none;
	height: 100%;
	min-width: 0;
	grid-column-end: span ${props.width};
	grid-row-end: span ${props.height};
	${props.left && css`grid-column-start: ${props.left};`};
	${props.top && css`grid-row-start: ${props.top};`};
	${props.center && css`text-align:  ${props.center};`};
	${props.area && css`grid-area: ${props.area};`};
	${props.middle && css` 
		display: inline-flex;
		flex-flow: column wrap;
		justify-content: center;
		justify-self: stretch;
    `};
    ${props.customCss};
  `;

const CellCSS = (props: CellProps): string => {
  const { mobile, tablet, ...nProps } = props;

  const mobileCSS = mobile && css`@media screen and (${Breakpoints.mobile}) {
    ${CellGenerator(Object.assign({}, defaultCellMobile, mobile))}
  }`
  const tabletCSS = tablet && css`@media screen and (${Breakpoints.tablet}) {
    ${CellGenerator(Object.assign({}, defaultCellTablet, tablet))}
  }`

  return cx(CellGenerator(Object.assign({}, defaultCell, nProps)), tabletCSS, mobileCSS, props.className)
}

export default (props: CellProps) => {
  const CellTag = props.as || 'div';
  return (
    //@ts-ignore Any html tag should have Intrinsic react atttributs
    <CellTag className={CellCSS(props)} >{props.children} </CellTag>)
};
