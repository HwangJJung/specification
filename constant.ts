import { createSelector, OutputSelector } from 'reselect'
import keyMirror from '@src/lib/keyMirror'
import Specification from '@src/specification'

export const USING_STATUS = keyMirror('', {
  USING: null,
  DELETED: null,
})

export type SpecSelectorType = (state?: any, props?: any) => Specification

export type makeSpecSelectorType = (
  state?: any,
  props?: any
) => Specification | SpecSelectorType
