'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading,
      disabled,
      variant = 'primary',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'flex items-center justify-center gap-1 w-full h-[40px] sm:h-[43px] py-2 sm:py-3 px-4 sm:px-5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer disabled:cursor-not-allowed'

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50',
      secondary:
        'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {isLoading && <Spinner size="sm" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
