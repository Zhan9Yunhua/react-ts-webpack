import * as React from 'react';
import styled from '@/styles';
import { StyledComponentClass } from 'styled-components';
import { IStyleInterface } from '@/styles/variable';

interface IActionGroupProps extends IClassName {
  direction: 'right' | 'left';
  pixel?: string | number;
  children: React.ReactNode;
}

type StyledComponent = StyledComponentClass<IActionGroupProps, IStyleInterface>;

interface IActionGroup extends StyledComponent {
  ActionItem?: any;
  ActionLine?: any;
}

const ActionGroup: IActionGroup = styled<IActionGroupProps, 'div'>('div')`
  display: flex;
  & > .action__item {
    display: inline-block;
    margin: ${props => (props.direction === 'right' ? `0 ${props.pixel}px 0 0` : `0 0 0 ${props.pixel}px`)};
    &:${props => (props.direction === 'right' ? 'last-child' : 'first-child')} {
      margin: 0;
    }
  }
`;

ActionGroup.defaultProps = {
  pixel: 10
};

interface IActionItemProps extends React.ReactPortal {}

const ActionItem = (props: IActionItemProps) => <span className="action__item">{props.children}</span>;

interface IActionLineProps extends IClassName {
  border: string;
  height: number | string;
  spacing?: number | string;
}

const ActionLine = styled<IActionLineProps, 'i'>('i')`
  display: inline-block;
  position: relative;
  margin: 0 ${props => props.spacing}px;
  &::before {
    content: '';
    position: absolute;
    height: ${props => `${props.height}px`};
    left: 0;
    top: ${props => `${countTop(props.height)}px`};
    border-left: ${props => props.border};
  }
`;

ActionLine.defaultProps = {
  spacing: 20
};

ActionGroup.ActionItem = ActionItem;
ActionGroup.ActionLine = ActionLine;

export default ActionGroup;
// export default { ActionGroup, ActionItem, ActionLine };

function countTop(h: string | number, height = 64) {
  h = typeof h === 'string' ? parseInt(h, 10) : h;
  return (height - h) / 2;
}
