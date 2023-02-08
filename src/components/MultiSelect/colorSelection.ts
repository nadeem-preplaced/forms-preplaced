import chroma from 'chroma-js';
import { ColourOption } from '../../utility/SelectorOptionsColor';
import  { StylesConfig } from 'react-select';

interface genericOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
    // const colourStyles: StylesConfig<ColourOption, true> = {
    //     control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    //     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //       const color = chroma(data.color);
    //       return {
    //         ...styles,
    //         backgroundColor: isDisabled
    //           ? undefined
    //           : isSelected
    //           ? data.color
    //           : isFocused
    //           ? color.alpha(0.1).css()
    //           : undefined,
    //         color: isDisabled
    //           ? '#ccc'
    //           : isSelected
    //           ? chroma.contrast(color, 'white') > 2
    //             ? 'white'
    //             : 'black'
    //           : data.color,
    //         cursor: isDisabled ? 'not-allowed' : 'default',
      
    //         ':active': {
    //           ...styles[':active'],
    //           backgroundColor: !isDisabled
    //             ? isSelected
    //               ? data.color
    //               : color.alpha(0.3).css()
    //             : undefined,
    //         },
    //       };
    //     },
    //     multiValue: (styles, { data }) => {
    //       const color = chroma(data.color);
    //       return {
    //         ...styles,
    //         backgroundColor: color.alpha(0.1).css(),
    //       };
    //     },
    //     multiValueLabel: (styles, { data }) => ({
    //       ...styles,
    //       color: data.color,
    //     }),
    //     multiValueRemove: (styles, { data }) => ({
    //       ...styles,
    //       color: data.color,
    //       ':hover': {
    //         backgroundColor: data.color,
    //         color: 'white',
    //       },
    //     }),
    //   };
    const colourStyles: StylesConfig<genericOption, true> = {
      // control: (styles) => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color)
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? data.color
            : isFocused
            ? color.alpha(0.1).css()
            : undefined,
          color: isDisabled
            ? '#ccc'
            : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
    
          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled
              ? isSelected
                ? data.color
                : color.alpha(0.3).css()
              : undefined,
          },
        }
      },
      menuPortal: (base) => ({ ...base, zIndex: 1 }),
      multiValue: (styles, { data }) => {
        const color = chroma(data.color)
        return {
          ...styles,
          backgroundColor: color.alpha(0.1).css(),
        }
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
          backgroundColor: data.color,
          color: 'white',
        },
      }),
    }

export default colourStyles;