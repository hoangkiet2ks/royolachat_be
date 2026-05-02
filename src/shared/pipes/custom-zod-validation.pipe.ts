import { UnprocessableEntityException } from '@nestjs/common'
import { createZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'

const CustomZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: unknown) => {
    if (error instanceof ZodError) {
      return new UnprocessableEntityException({
        errors: error.issues.map((issue) => ({
          code: issue.code,
          path: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    return new UnprocessableEntityException({
      errors: [
        {
          code: 'unknown',
          path: '',
          message: 'Validation failed',
        },
      ],
    })
  },
})

export default CustomZodValidationPipe
