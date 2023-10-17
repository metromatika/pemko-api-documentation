import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import ReactSelect, { components, StylesConfig } from 'react-select'
import { FiChevronDown } from 'react-icons/fi'
import * as React from 'react'

import Label from './Label'

type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T

type SelectProps = {
  id: string
  label: string
  disabled?: boolean
  options: { value: string; label: string }[]
  defaultValue?: string
  validation?: RegisterOptions
} & React.ComponentPropsWithoutRef<'select'> &
  ExtractProps<ReactSelect>

export default function Select(props: SelectProps) {
  const { label, id, disabled = false, options, defaultValue, placeholder, validation, ...rest } = props
  const { control, formState } = useFormContext()
  const { errors } = formState

  const customStyles: StylesConfig = {
    control: (styles, state) => ({
      ...styles,
      border: `2px solid ${errors[id] ? '#EF4444' : state.isFocused ? '#059669' : '#e2e8f0'}`,
      boxShadow: 'none',
      '&:hover': {
        border: `2px solid ${errors[id] ? '#EF4444' : '#e2e8f0'}`
      },
      '*': {
        boxShadow: 'none'
      },
      borderRadius: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: disabled ? '#F3F4F6' : undefined,
      cursor: 'pointer',
      '@media (max-width: 640px)': {
        padding: '0.5rem 1rem'
      },
      transition: 'none'
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: '0',
      gap: '0.5rem'
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: '0'
      }
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#878787',
      '&:hover': {
        color: '#878787'
      }
    }),
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? '#fff' : '#2B3E51',
      background: state.isSelected ? '#059669' : '#fff',
      '&:hover': {
        background: '#059669',
        color: '#fff'
      },
      cursor: 'pointer'
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '0.5rem',
      overvlow: 'hidden'
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#9ca3af'
    })
  }

  return (
    <div className="flex w-full flex-col gap-1.5 xl:gap-2.5 relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative text-sm md:text-[15px]">
        <Controller
          {...rest}
          name={id}
          control={control}
          rules={validation}
          defaultValue={defaultValue ? { value: defaultValue, label: defaultValue } : ''}
          render={({ field }) => (
            <ReactSelect
              {...field}
              isDisabled={disabled}
              placeholder={placeholder}
              options={options}
              styles={customStyles}
              className="!min-h-[2.25rem] md:!min-h-[2.5rem] text-[#2B3E51]"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: (props) => (
                  <components.DropdownIndicator {...props}>
                    <FiChevronDown className="text-sm text-slate-400 sm:text-xl" />
                  </components.DropdownIndicator>
                )
              }}
            />
          )}
        />
      </div>
      {errors[id] && <span className="mt-1 text-xs text-red-400 xl:text-sm absolute top-full left-0">{errors[id]?.message?.toString()}</span>}
    </div>
  )
}
